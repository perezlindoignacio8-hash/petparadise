'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductByHandle, formatPrice } from '@/lib/shopify';
import { sanitizeHtml } from '@/lib/sanitize';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types/shopify';
import CountdownTimer from '@/components/CountdownTimer';
import ProductReviews, { type Review } from '@/components/ProductReviews';
import StickyProductBar from '@/components/StickyProductBar';
import VideoReviews from '@/components/VideoReviews';
import PainPointSection from '@/components/PainPointSection';

const productReviews: Review[] = [
  {
    name: 'Florencia A.',
    location: 'Tucumán',
    images: ['/perroml1.png', '/perroml12.png'],
    stars: 5,
    headline: '¡Una genialidad!',
    text: 'No esperaba que funcionara tan bien la verdad. Mi caniche toma agua sin problema y la botella no derrama ni una gota. Me llegó re rápido y bien empaquetada. Súper recomendada para los que paseamos mucho ☀️',
  },
  {
    name: 'Tomás R.',
    location: 'Neuquén',
    images: ['/perroml2.png', '/perroml22.png'],
    stars: 5,
    headline: 'Excelente para viajar',
    text: 'La uso para los viajes a la cordillera con mi pastor alemán. Antes era un drama pararme cada hora a buscarle agua, ahora le doy en cualquier momento. Vale cada peso 🚗',
  },
  {
    name: 'Camila B.',
    location: 'Bahía Blanca',
    images: ['/perroml3.png'],
    stars: 5,
    headline: 'Mi salvación',
    text: 'Tengo dos cachorros y caminar con dos botellas era imposible. Esta es liviana, fácil de usar y los perros se acostumbraron rápido. Ya pedí otra para regalar a mi hermana 🐶🐶',
  },
  {
    name: 'Federico O.',
    location: 'Mar del Plata',
    images: ['/perroml4.png'],
    stars: 5,
    headline: 'Práctico y resistente',
    text: 'La uso en la playa todos los días y aguanta arena, sol, lo que sea. El cierre no falla nunca. Buena inversión, mi bulldog está siempre hidratado. Cumple lo que promete.',
  },
];

const PRODUCT_CONFIGS: Record<string, any> = {
  'kit-premium-de-paseo-para-perros': {
    descriptionItems: [
      {
        icon: '💧',
        title: 'Botella Portátil Premium',
        description: 'Diseño antigoteo, ligera y práctica. Mantené a tu perro hidratado en cualquier momento.',
        bgColor: 'bg-blue-100',
      },
      {
        icon: '🧹',
        title: 'Juntador de Excremento',
        description: 'Práctico y funcional. Olvidate de los paseos incómodos, llevá las bolsas de forma fácil.',
        bgColor: 'bg-amber-100',
      },
      {
        icon: '🦺',
        title: 'Chaleco de Paseo',
        description: 'Regalo incluido. Refuerza la seguridad y visibilidad de tu perro en cada paseo.',
        bgColor: 'bg-slate-100',
      },
    ],
    features: [
      { icon: '🎒', label: 'Portátil', text: 'Ligero y compacto' },
      { icon: '💧', label: 'Antigoteo', text: 'Sin derrames' },
      { icon: '⚡', label: 'Práctica', text: 'Fácil de usar' },
      { icon: '✈️', label: 'Viajes', text: 'Ideal en cualquier lugar' },
      { icon: '🛡️', label: 'Resistente', text: 'Material premium' },
    ],
  },
  'kit-higiene-para-tu-mascota': {
    descriptionItems: [
      {
        icon: '🧤',
        title: 'Guante de Aseo',
        description: 'Guante con masaje relajante para cepillar y mimar a tu mascota al mismo tiempo.',
        bgColor: 'bg-blue-100',
      },
      {
        icon: '🪮',
        title: 'Deslanador',
        description: 'Remueve el pelo muerto fácilmente y mantiene el pelaje suave y brillante.',
        bgColor: 'bg-purple-100',
      },
      {
        icon: '✂️',
        title: 'Cortauñas',
        description: 'Cortauñas seguro y preciso, ideal para mantener las uñas en su largo justo.',
        bgColor: 'bg-pink-100',
      },
      {
        icon: '🪥',
        title: 'Cepillo Dental',
        description: 'Cepillo para una limpieza dental rápida y efectiva, cuidando la salud bucal.',
        bgColor: 'bg-green-100',
      },
    ],
    features: [
      { icon: '🛁', label: 'Higiene', text: 'Cuidado integral' },
      { icon: '✨', label: 'Suave', text: 'Sin lastimar' },
      { icon: '💪', label: 'Resistente', text: 'Material premium' },
      { icon: '🐾', label: 'Práctico', text: 'Fácil de usar' },
      { icon: '🏠', label: 'En casa', text: 'Sin ir al groomer' },
    ],
  },
  'kit-argentina-mundial-2026': {
    descriptionItems: [
      {
        icon: '🇦🇷',
        title: 'Polar Argentina',
        description: 'Polar cómodo y abrigado con los colores de Argentina, ideal para apoyar en el Mundial 2026.',
        bgColor: 'bg-blue-100',
      },
      {
        icon: '🧣',
        title: 'Bandana Argentina',
        description: 'Bandana con diseños característicos de Argentina, perfecta para llevar tu pasión.',
        bgColor: 'bg-yellow-100',
      },
      {
        icon: '🌟',
        title: 'Pelota Saltarina con Luces',
        description: 'Juguete interactivo con luces que brilla mientras tu mascota juega.',
        bgColor: 'bg-pink-100',
      },
    ],
    features: [
      { icon: '⚽', label: 'Calidad', text: 'Material premium' },
      { icon: '🏆', label: 'Edición', text: 'Limited 2026' },
      { icon: '🌟', label: 'Exclusivo', text: 'Colección especial' },
      { icon: '💪', label: 'Orgullo', text: 'Representa tu país' },
    ],
  },
};

export default function ProductoPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const handle = params.handle as string;
  const shouldAddToCart = searchParams.get('addToCart') === '1';
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const { addItem } = useCart();
  const autoAddedRef = useRef(false);

  useEffect(() => {
    if (handle) {
      getProductByHandle(handle).then((p) => {
        setProduct(p);
        setLoading(false);

        // Track ViewContent event with Meta Pixel
        if (typeof window !== 'undefined' && window.fbq && p) {
          const price = p.priceRange.minVariantPrice;
          window.fbq('track', 'ViewContent', {
            content_name: p.title,
            content_ids: [p.id],
            content_type: 'product',
            value: parseFloat(price.amount),
            currency: price.currencyCode,
          });
        }
      });
    }
  }, [handle]);

  useEffect(() => {
    if (!shouldAddToCart || !product || autoAddedRef.current) return;
    autoAddedRef.current = true;
    addItem(product, 1);
    router.replace(`/producto/${handle}`, { scroll: false });
  }, [shouldAddToCart, product, addItem, router, handle]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
          <div className="aspect-square bg-gray-100 rounded-2xl" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-100 rounded w-3/4" />
            <div className="h-6 bg-gray-100 rounded w-1/4" />
            <div className="h-20 bg-gray-100 rounded" />
            <div className="h-12 bg-gray-100 rounded-xl w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <span className="text-6xl block mb-4">😿</span>
        <h1 className="text-2xl font-bold mb-2">Producto no encontrado</h1>
        <p className="text-gray-500 mb-6">No pudimos encontrar el producto que buscás.</p>
        <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-slate-900 transition-colors">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const images = product.images.edges.map((e) => e.node);
  const price = product.priceRange.minVariantPrice;
  const compareAt = product.compareAtPriceRange?.minVariantPrice;
  const hasDiscount = compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount);
  const currentImage = images[selectedImage] || product.featuredImage;
  const isDemo = currentImage?.url.startsWith('/products/');

  return (
    <>
      <StickyProductBar product={product} />
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 ${handle === 'kit-argentina-mundial-2026' ? 'argentina-theme' : ''}`}>
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-400">
          <Link href="/" className="hover:text-slate-800 transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div
              className="rounded-2xl overflow-hidden bg-gray-50 relative"
              style={{
                aspectRatio:
                  currentImage?.width && currentImage?.height
                    ? `${currentImage.width} / ${currentImage.height}`
                    : '1 / 1',
              }}
            >
              {hasDiscount && (
                <div className={`absolute top-4 left-4 z-10 text-white text-sm font-bold px-3 py-1.5 rounded-full ${handle === 'kit-argentina-mundial-2026' ? 'bg-sky-400' : 'bg-slate-800'
                  }`}>
                  OFERTA
                </div>
              )}
              {/* Free shipping badge */}
              <div className={`absolute top-4 right-4 z-10 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 ${handle === 'kit-argentina-mundial-2026' ? 'bg-sky-400' : 'bg-slate-800'
                }`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
                GRATIS
              </div>
              {isDemo && handle === 'kit-argentina-mundial-2026' ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <span className="text-8xl">🐕</span>
                </div>
              ) : handle === 'kit-argentina-mundial-2026' && currentImage ? (
                <Image src={currentImage.url} alt={product.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
              ) : isDemo ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <span className="text-8xl">{product.productType === 'Gatos' ? '🐱' : '🐕'}</span>
                </div>
              ) : currentImage ? (
                <Image src={currentImage.url} alt={currentImage.altText || product.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
              ) : null}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${i === selectedImage ? 'border-slate-800 shadow-md' : 'border-gray-200 hover:border-gray-400'}`}>
                    <Image src={img.url} alt={img.altText || ''} width={80} height={80} className="object-cover w-full h-full" />
                  </button>
                ))}
              </div>
            )}

            {handle === 'kit-premium-de-paseo-para-perros' && (
              <VideoReviews videos={[
                {
                  id: 'video2',
                  title: '',
                  videoUrl: '/videoreview1.mp4'
                },
                {
                  id: 'video3',
                  title: '',
                  videoUrl: '/cacaperro.mp4'
                }
              ]} />
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-slate-800 font-medium mb-1">{product.productType || 'Pet Paradise'}</p>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900">{product.title}</h1>
              {handle === 'kit-premium-de-paseo-para-perros' && (
                <div className="mt-3 inline-flex items-center gap-2 bg-green-50 border border-green-100 px-3 py-1.5 rounded-full">
                  <div className="relative inline-flex">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <svg key={`bg-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <div className="absolute inset-0 flex overflow-hidden" style={{ width: '90%' }}>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <svg key={`fg-${i}`} className="w-4 h-4 text-yellow-400 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <span className="text-sm font-bold text-green-800">4.5</span>
                  <span className="text-xs text-green-700">(238 reseñas)</span>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-3 flex-wrap">
                {hasDiscount && (
                  <span className="text-xl text-gray-400 line-through">{formatPrice(compareAt.amount, compareAt.currencyCode)}</span>
                )}
                <span className={`text-3xl font-black ${hasDiscount ? 'text-slate-800' : 'text-gray-900'}`}>
                  {formatPrice(price.amount, price.currencyCode)}
                </span>
                {hasDiscount && (
                  <span className={`text-white text-sm font-black px-3 py-1 rounded-full ${handle === 'kit-argentina-mundial-2026'
                      ? 'bg-sky-400'
                      : 'bg-slate-800'
                    }`}>
                    -{Math.round((1 - parseFloat(price.amount) / parseFloat(compareAt.amount)) * 100)}% OFF
                  </span>
                )}
              </div>
              <p className="text-sm text-green-600 font-medium mt-1">
                3 cuotas sin interés x {formatPrice((parseFloat(price.amount) / 3).toFixed(2), price.currencyCode)}
              </p>
            </div>

            {PRODUCT_CONFIGS[handle] ? (
              <div className="space-y-3">
                {handle === 'kit-premium-de-paseo-para-perros' && (
                  <>
                    {/* Gift highlight */}
                    <div className="relative bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-2xl p-4 shadow-lg overflow-hidden">
                      <div className="absolute -right-4 -top-4 text-7xl opacity-10 rotate-12 select-none">🎁</div>
                      <div className="relative flex items-start gap-3">
                        <span className="text-3xl shrink-0">🎁</span>
                        <div>
                          <p className="font-black uppercase text-xs tracking-widest text-white/80">Hoy te llevás de regalo</p>
                          <p className="font-bold text-sm mt-0.5">Chaleco de paseo + Envío gratis</p>
                        </div>
                      </div>
                    </div>

                    <CountdownTimer />
                  </>
                )}
                {handle === 'kit-argentina-mundial-2026' && (
                  <>
                    {/* Gift highlight */}
                    <div className="relative bg-gradient-to-r from-sky-400 to-sky-300 text-white rounded-2xl p-4 shadow-lg overflow-hidden">
                      <div className="absolute -right-4 -top-4 text-7xl opacity-10 rotate-12 select-none">🎁</div>
                      <div className="relative flex items-start gap-3">
                        <span className="text-3xl shrink-0">🎁</span>
                        <div>
                          <p className="font-black uppercase text-xs tracking-widest text-white/80">Hoy te llevás de regalo</p>
                          <p className="font-bold text-sm mt-0.5">Bandanas Argentina + Pelotita saltarina con luces + Envío gratis</p>
                        </div>
                      </div>
                    </div>

                    {/* Countdown Timer Argentina Style */}
                    <style>{`
                    .argentina-countdown #countdown-timer {
                      background: linear-gradient(90deg, #60A5FA 0%, #FBBF24 50%, #60A5FA 100%) !important;
                    }
                  `}</style>
                    <div className="argentina-countdown">
                      <CountdownTimer />
                    </div>

                    {/* Sizes Selection */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-4">Elegí el talle:</label>
                      <div className="grid grid-cols-6 gap-2">
                        {Array.from({ length: 11 }, (_, i) => i + 2).map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`py-3 px-2 rounded-xl font-black text-sm transition-all duration-300 border-2 ${selectedSize === size
                                ? 'bg-sky-400 text-white border-sky-400 shadow-lg'
                                : 'bg-white text-sky-400 border-sky-300 hover:border-sky-400'
                              }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Quantity */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700">Cantidad:</span>
                  <div className={`flex items-center rounded-xl overflow-hidden ${handle === 'kit-argentina-mundial-2026'
                      ? 'border-2 border-sky-300'
                      : 'border border-gray-200'
                    }`}>
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className={`w-10 h-10 flex items-center justify-center transition-colors ${handle === 'kit-argentina-mundial-2026'
                        ? 'text-sky-400 hover:bg-sky-50'
                        : 'text-gray-600 hover:bg-gray-100'
                      }`}>−</button>
                    <span className={`w-12 h-10 flex items-center justify-center font-bold text-sm ${handle === 'kit-argentina-mundial-2026'
                        ? 'border-x-2 border-sky-300'
                        : 'border-x border-gray-200'
                      }`}>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className={`w-10 h-10 flex items-center justify-center transition-colors ${handle === 'kit-argentina-mundial-2026'
                        ? 'text-sky-400 hover:bg-sky-50'
                        : 'text-gray-600 hover:bg-gray-100'
                      }`}>+</button>
                  </div>
                </div>

                {/* Add to Cart */}
                <button onClick={() => addItem(product, quantity, handle === 'kit-argentina-mundial-2026' ? selectedSize || undefined : undefined)}
                  className={`btn-shimmer w-full text-white font-black py-6 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl flex items-center justify-center gap-4 text-lg md:text-xl mt-8 mb-4 ${handle === 'kit-argentina-mundial-2026'
                      ? 'bg-sky-400 hover:bg-sky-500'
                      : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  id="add-to-cart-detail">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                  Agregar al carrito
                </button>

                {/* Shopify description */}
                {(product.descriptionHtml || product.description) && (
                  <div className={`rounded-3xl p-8 border ${handle === 'kit-argentina-mundial-2026'
                      ? 'bg-gradient-to-br from-sky-50 to-sky-50/40 border-sky-200'
                      : 'bg-gradient-to-br from-gray-50 to-white border-gray-100'
                    }`}>
                    <h3 className="text-2xl font-black text-gray-900 mb-6 text-center">Descripción</h3>
                    <div className="prose prose-sm text-gray-600 max-w-none" dangerouslySetInnerHTML={{ __html: sanitizeHtml(product.descriptionHtml || `<p>${product.description}</p>`) }} />
                  </div>
                )}

                {/* What's Included Section - solo para Argentina y Kit Higiene */}
                {handle !== 'kit-premium-de-paseo-para-perros' && (
                  <div className={`rounded-3xl p-8 border ${handle === 'kit-argentina-mundial-2026'
                      ? 'bg-gradient-to-br from-sky-50 to-sky-50/40 border-sky-200'
                      : 'bg-gradient-to-br from-gray-50 to-white border-gray-100'
                    }`}>
                    <h3 className="text-2xl font-black text-gray-900 mb-8 text-center">Qué incluye tu compra</h3>

                    <div className="flex flex-row gap-4 md:gap-8 justify-center items-stretch">
                      {PRODUCT_CONFIGS[handle].descriptionItems.map((item: any) => (
                        <div key={item.title} className="flex flex-col items-center text-center flex-1">
                          <div className={`w-20 h-20 md:w-24 md:h-24 ${item.bgColor} rounded-2xl flex items-center justify-center text-4xl md:text-5xl mb-3 md:mb-4 shadow-md`}>
                            {item.icon}
                          </div>
                          <h4 className="font-black text-gray-900 text-xs md:text-sm mb-1 md:mb-2">{item.title}</h4>
                          <p className="text-[10px] md:text-xs text-gray-600 leading-relaxed">{item.description}</p>
                        </div>
                      ))}
                    </div>

                    {/* Highlight */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <p className="text-center text-sm font-bold text-gray-900">
                        ✨ <span className="text-slate-800">{PRODUCT_CONFIGS[handle].descriptionItems.length} productos en 1 kit</span> - Todo lo que necesitas
                      </p>
                    </div>
                  </div>
                )}

                {/* Features pills */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 pt-6">
                  {PRODUCT_CONFIGS[handle].features.map((item: any) => (
                    <div key={item.label} className="flex flex-col items-center text-center bg-gradient-to-b from-green-50 to-green-50/40 border border-green-200 rounded-xl px-3 md:px-4 py-3 md:py-4 hover:shadow-md transition-shadow duration-300">
                      <span className="text-2xl md:text-3xl mb-2">{item.icon}</span>
                      <h4 className="font-black text-green-900 text-xs md:text-sm mb-1">{item.label}</h4>
                      <p className="text-[10px] md:text-xs text-green-700">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="prose prose-sm text-gray-600 max-w-none" dangerouslySetInnerHTML={{ __html: sanitizeHtml(product.descriptionHtml || `<p>${product.description}</p>`) }} />
            )}
          </div>
        </div>

      </div>

      {handle === 'kit-premium-de-paseo-para-perros' && (
        <>
          <PainPointSection
            title="Tu perro merece agua limpia en cada paseo"
            subtitle="Descubrí por qué miles de dueños ya no salen sin la botella portátil."
            cardTitle="Los paseos sin agua pueden ser peligrosos."
            bullets={[
              'Tu perro bebe de charcos sucios y después tiene problemas digestivos o infecciones.',
              'Se deshidrata rápido en días calurosos y termina exhausto antes de tiempo.',
              'Las botellas comunes gotean, mojan tu mochila y ensucias todo lo que cargás.',
              'Querés disfrutar del paseo, no estar pendiente de si tiene sed o está enfermo.',
            ]}
            beforeSrc="/perroagua.jpg"
            afterSrc="/perrocansado.jpg"
          />

          <ProductReviews reviews={productReviews} />
        </>
      )}

      {handle === 'kit-argentina-mundial-2026' && (
        <section className="relative py-20 md:py-28 bg-sky-400">
          {/* Top wave */}
          <svg
            className="absolute top-0 left-0 w-full h-12 md:h-20 -translate-y-[1px]"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              fill="white"
              d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,0 L0,0 Z"
            />
          </svg>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                Tu mascota también es <span className="underline decoration-white/40 decoration-4 underline-offset-4">campeona del mundo</span>
              </h2>
              <p className="text-white/90 text-base md:text-lg">
                Vestí a tu mascota con los colores de Argentina y celebrá juntos la pasión por el fútbol, porque en casa celebramos todos.
              </p>
            </div>

            {/* Two columns - Solution & Image */}
            <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 items-center mb-16">
              {/* Left: white card with bullets */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl order-2 md:order-1">
                <div className="inline-block px-3 py-1 rounded-full mb-4 bg-sky-100">
                  <span className="text-xs font-black uppercase tracking-widest text-sky-800">La Solución</span>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-6 leading-tight">
                  Tu perro merece representar a Argentina.
                </h3>
                <ul className="space-y-4">
                  {[
                    'Tu perro merece sentirse parte de la familia durante el Mundial.',
                    'Los colores de Argentina lo hacen sentir especial en cada paseo.',
                    'Representa con orgullo a nuestro país junto a tu mejor amigo.',
                    'Celebrá el fútbol y la amistad en una sola prenda.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-700 text-sm md:text-base leading-relaxed">
                      <svg className="w-6 h-6 shrink-0 mt-0.5 text-sky-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Family image */}
              <div className="order-1 md:order-2">
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/familiamundial.png"
                    alt="Familia Mundial 2026"
                    width={600}
                    height={600}
                    loading="lazy"
                    quality={65}
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="backdrop-blur border rounded-2xl p-8 mb-12 bg-white/15 border-white/20">
              <div className="text-center mb-6">
                <span className="text-white text-sm font-bold uppercase tracking-widest">Prueba Social</span>
              </div>
              <div className="flex justify-center gap-6 md:gap-12">
                {[
                  { stat: '+350', label: 'Clientes satisfechos' },
                  { stat: '4.5★', label: 'Calificación promedio' },
                  { stat: '100%', label: 'Garantía de satisfacción' },
                ].map((item) => (
                  <div key={item.label} className="text-center flex-1">
                    <div className="text-2xl md:text-3xl font-black text-white mb-2">{item.stat}</div>
                    <p className="text-white/80 text-xs md:text-sm">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-block font-black py-4 px-8 md:px-12 rounded-2xl text-lg md:text-xl transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-xl bg-white text-sky-400 hover:bg-sky-50"
              >
                Alentar en familia
              </button>
            </div>
          </div>

          {/* Bottom wave */}
          <svg
            className="absolute bottom-0 left-0 w-full h-12 md:h-20 translate-y-[1px] rotate-180"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              fill="white"
              d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,0 L0,0 Z"
            />
          </svg>
        </section>
      )}
    </>
  );
}
