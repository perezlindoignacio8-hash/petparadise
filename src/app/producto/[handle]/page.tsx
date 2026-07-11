'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductByHandle, formatPrice } from '@/lib/shopify';
import { sanitizeHtml } from '@/lib/sanitize';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types/shopify';
import ProductReviews, { type Review } from '@/components/ProductReviews';
import StickyProductBar from '@/components/StickyProductBar';
import VideoReviews from '@/components/VideoReviews';
import PainPointSection from '@/components/PainPointSection';

function extractVideoThumbnail(videoUrl: string, callback: (thumbnail: string) => void) {
  const video = document.createElement('video');
  video.src = videoUrl;
  video.crossOrigin = 'anonymous';
  video.muted = true;
  video.preload = 'metadata';

  let seekAttempts = 0;

  const handleCanPlay = () => {
    if (seekAttempts === 0) {
      seekAttempts++;
      video.currentTime = 3;
    }
  };

  const handleSeeked = () => {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 320;
    canvas.height = video.videoHeight || 240;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0);
      callback(canvas.toDataURL('image/jpeg', 0.9));
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('seeked', handleSeeked);
    }
  };

  video.addEventListener('canplay', handleCanPlay);
  video.addEventListener('seeked', handleSeeked);
}

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
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
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

  useEffect(() => {
    if (handle === 'kit-premium-de-paseo-para-perros') {
      extractVideoThumbnail('/videoreview1.mp4', setVideoThumbnail);
    }
  }, [handle]);

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
        <Link href="/" className="bg-[#303854] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#303854] transition-colors">
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
          <Link href="/" className="hover:text-[#303854] transition-colors">Inicio</Link>
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
                <div className={`absolute top-4 left-4 z-10 text-white text-sm font-bold px-3 py-1.5 rounded-full ${handle === 'kit-argentina-mundial-2026' ? 'bg-[#7DB8E8]' : 'bg-[#303854]'
                  }`}>
                  OFERTA
                </div>
              )}
              {/* Free shipping badge */}
              <div className={`absolute top-4 right-4 z-10 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 ${handle === 'kit-argentina-mundial-2026' ? 'bg-[#7DB8E8]' : 'bg-[#303854]'
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
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${i === selectedImage ? 'border-[#303854] shadow-md' : 'border-gray-200 hover:border-gray-400'}`}>
                    <Image src={img.url} alt={img.altText || ''} width={80} height={80} className="object-cover w-full h-full" />
                  </button>
                ))}
                {handle === 'kit-premium-de-paseo-para-perros' && (
                  <button onClick={() => {
                      const modal = document.getElementById('video-modal');
                      const video = document.getElementById('modal-video') as HTMLVideoElement | null;
                      if (modal) modal.classList.remove('hidden');
                      if (video) { video.currentTime = 0; video.play().catch(() => {}); }
                    }}
                    className="w-20 h-20 rounded-lg overflow-hidden border-2 shrink-0 flex items-center justify-center cursor-pointer border-gray-200 hover:border-gray-400 transition-all group relative">
                    {videoThumbnail ? (
                      <>
                        <img src={videoThumbnail} alt="Video" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-6 h-6 group-hover:scale-110 transition-transform">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gray-900" />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-8 h-8 group-hover:scale-110 transition-transform relative z-10">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </>
                    )}
                  </button>
                )}
              </div>
            )}

            {handle === 'kit-premium-de-paseo-para-perros' && (
              <div id="video-modal" className="hidden fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                <div className="relative w-full max-w-2xl bg-black rounded-lg overflow-hidden">
                  <button
                    onClick={() => {
                      const modal = document.getElementById('video-modal');
                      const video = document.getElementById('modal-video') as HTMLVideoElement | null;
                      if (video) { video.pause(); video.currentTime = 0; }
                      if (modal) modal.classList.add('hidden');
                    }}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-[#303854] hover:bg-[#303854] text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div style={{ paddingBottom: '56.25%', position: 'relative', height: 0 }}>
                    <video
                      id="modal-video"
                      controls
                      preload="none"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                      }}
                      src="/videoreview1.mp4"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Reviews above title */}
            {handle === 'kit-premium-de-paseo-para-perros' && (
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className={`w-5 h-5 ${i <= 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-base font-bold text-[#303854]">4.5</span>
                <span className="text-sm text-gray-600">( 652 reseñas )</span>
              </div>
            )}

            <div>
              <h1 className="text-3xl md:text-4xl font-black text-[#303854] mb-3">{product.title}</h1>
            </div>

            <div className="space-y-3">
              {hasDiscount && (
                <span className={`inline-block text-white text-xs font-black px-3 py-1.5 rounded-full ${handle === 'kit-argentina-mundial-2026'
                    ? 'bg-[#7DB8E8]'
                    : 'bg-red-600'
                  }`}>
                  -{Math.round((1 - parseFloat(price.amount) / parseFloat(compareAt.amount)) * 100)}% OFF
                </span>
              )}
              <div>
                {hasDiscount && (
                  <div className="flex items-center gap-4 md:gap-6">
                    <span className="text-3xl md:text-4xl font-black text-gray-400 line-through">{formatPrice(compareAt.amount, compareAt.currencyCode)}</span>
                    <span className="text-3xl md:text-4xl font-black text-red-600">
                      {formatPrice(price.amount, price.currencyCode)}
                    </span>
                  </div>
                )}
                {!hasDiscount && (
                  <span className="text-5xl md:text-6xl font-black text-[#303854]">
                    {formatPrice(price.amount, price.currencyCode)}
                  </span>
                )}

                {/* Características */}
                <div className="mt-6 space-y-2">
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Agua limpia en cualquier lugar.
                  </p>
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Diseño portátil y fácil de usar.
                  </p>
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Ideal para paseos, viajes y aventuras.
                  </p>
                </div>
              </div>

            </div>

            {PRODUCT_CONFIGS[handle] ? (
              <div className="space-y-3">
                {/* Stock Alert */}
                <div className="text-center flex items-center justify-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#7DB8E8] animate-pulse shadow-lg" style={{boxShadow: '0 0 10px rgba(125, 184, 232, 0.6)'}}></span>
                  <span className="text-[#303854] text-sm font-black">Quedan pocas unidades — <span className="text-[#7DB8E8]">pedí ahora</span></span>
                </div>

                {handle === 'kit-argentina-mundial-2026' && (
                  <>
                    {/* Gift highlight */}
                    <div className="relative bg-gradient-to-r from-[#7DB8E8] to-[#B0D4EE] text-white rounded-2xl p-4 shadow-lg overflow-hidden">
                      <div className="absolute -right-4 -top-4 text-7xl opacity-10 rotate-12 select-none">🎁</div>
                      <div className="relative flex items-start gap-3">
                        <span className="text-3xl shrink-0">🎁</span>
                        <div>
                          <p className="font-black uppercase text-xs tracking-widest text-white/80">Hoy te llevás de regalo</p>
                          <p className="font-bold text-sm mt-0.5">Bandanas Argentina + Pelotita saltarina con luces + Envío gratis</p>
                        </div>
                      </div>
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
                                ? 'bg-[#303854] text-white border-[#7DB8E8] shadow-lg'
                                : 'bg-white text-[#7DB8E8] border-[#B0D4EE] hover:border-[#7DB8E8]'
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
                      ? 'border-2 border-[#B0D4EE]'
                      : 'border border-gray-200'
                    }`}>
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className={`w-10 h-10 flex items-center justify-center transition-colors ${handle === 'kit-argentina-mundial-2026'
                        ? 'text-[#7DB8E8] hover:bg-orange-50'
                        : 'text-gray-600 hover:bg-gray-100'
                      }`}>−</button>
                    <span className={`w-12 h-10 flex items-center justify-center font-bold text-sm ${handle === 'kit-argentina-mundial-2026'
                        ? 'border-x-2 border-[#B0D4EE]'
                        : 'border-x border-gray-200'
                      }`}>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className={`w-10 h-10 flex items-center justify-center transition-colors ${handle === 'kit-argentina-mundial-2026'
                        ? 'text-[#7DB8E8] hover:bg-orange-50'
                        : 'text-gray-600 hover:bg-gray-100'
                      }`}>+</button>
                  </div>
                </div>

                {/* Add to Cart */}
                <button onClick={() => addItem(product, quantity, handle === 'kit-argentina-mundial-2026' ? selectedSize || undefined : undefined)}
                  className={`w-full text-white font-black py-6 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl flex items-center justify-center gap-4 text-lg md:text-xl mt-8 mb-4 ${handle === 'kit-argentina-mundial-2026'
                      ? 'bg-[#303854] hover:bg-[#1F2540]'
                      : 'bg-[#303854] hover:bg-[#1F2540]'
                    }`}
                  id="add-to-cart-detail">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                  Agregar al carrito
                </button>

                {/* Benefits below button */}
                <div className="flex justify-around mt-8 mb-6 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#303854]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                    <p className="font-bold text-[#303854] text-sm">Envío gratis</p>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#303854]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                    </svg>
                    <p className="font-bold text-[#303854] text-sm">30 días de garantía</p>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#303854]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.694 48.694 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.385 48.385 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                    </svg>
                    <p className="font-bold text-[#303854] text-sm">Soporte 24/7</p>
                  </div>
                </div>

                {/* Shopify description accordion */}
                {(product.descriptionHtml || product.description) && (
                  <details className="group border-t border-gray-200">
                    <summary className="flex items-center gap-3 cursor-pointer font-bold text-[#303854] text-base select-none hover:text-[#7DB8E8] transition-colors py-4 px-0 border-b border-gray-200">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-open:rotate-180 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                      ¿Cómo funciona?
                    </summary>
                    <div className="mt-4 text-base text-gray-700 space-y-3 pl-3">
                      <p><strong>Paso 1:</strong> Cargá la botella con agua fresca antes del paseo.</p>
                      <p><strong>Paso 2:</strong> Cuando tu mascota tenga sed, presioná el botón para llenar el recipiente.</p>
                      <p><strong>Paso 3:</strong> Si sobra agua, incliná la botella y presioná nuevamente el botón para que vuelva al interior, evitando desperdicios.</p>
                    </div>
                  </details>
                )}

                {/* Our Guarantee Section */}
                <details className="group mt-3">
                  <summary className="flex items-center gap-3 cursor-pointer font-bold text-[#303854] text-base select-none hover:text-[#7DB8E8] transition-colors py-3 px-0 border-b border-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-open:rotate-180 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                    Nuestra garantía
                  </summary>
                  <div className="mt-4 text-base text-gray-700 space-y-3 pl-3">
                    <p>Ofrecemos una <strong>garantía de 30 días</strong> en todos nuestros productos. Si por alguna razón no estás completamente satisfecho con tu compra, podés devolvérla sin hacer preguntas.</p>
                    <p><strong>¿Qué cubre nuestra garantía?</strong></p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Defectos de fabricación</li>
                      <li>Problemas de funcionamiento</li>
                      <li>Daños en el envío</li>
                    </ul>
                    <p>Tu satisfacción es nuestra prioridad. Si tenés algún inconveniente, contactanos y te ayudaremos de inmediato.</p>
                  </div>
                </details>

                {/* Shipping & Delivery Section */}
                <details className="group mt-3">
                  <summary className="flex items-center gap-3 cursor-pointer font-bold text-[#303854] text-base select-none hover:text-[#7DB8E8] transition-colors py-3 px-0 border-b border-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-open:rotate-180 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                    Envío y entrega
                  </summary>
                  <div className="mt-4 text-base text-gray-700 space-y-3 pl-3">
                    <p>Procesamos los pedidos dentro de las 24-72 horas y los entregamos en un plazo de 6-15 días según tu ubicación, con envío con seguimiento incluido para tu comodidad.</p>
                  </div>
                </details>

                {/* What's Included Section - solo para Argentina y Kit Higiene */}
                {handle !== 'kit-premium-de-paseo-para-perros' && (
                  <div className={`rounded-3xl p-8 border ${handle === 'kit-argentina-mundial-2026'
                      ? 'bg-gradient-to-br from-sky-50 to-sky-50/40 border-orange-200'
                      : 'bg-gradient-to-br from-gray-50 to-white border-gray-100'
                    }`}>
                    <h3 className="text-2xl font-black text-[#303854] mb-8 text-center">Qué incluye tu compra</h3>

                    <div className="flex flex-row gap-4 md:gap-8 justify-center items-stretch">
                      {PRODUCT_CONFIGS[handle].descriptionItems.map((item: any) => (
                        <div key={item.title} className="flex flex-col items-center text-center flex-1">
                          <div className={`w-20 h-20 md:w-24 md:h-24 ${item.bgColor} rounded-2xl flex items-center justify-center text-4xl md:text-5xl mb-3 md:mb-4 shadow-md`}>
                            {item.icon}
                          </div>
                          <h4 className="font-black text-[#303854] text-xs md:text-sm mb-1 md:mb-2">{item.title}</h4>
                          <p className="text-[10px] md:text-xs text-gray-600 leading-relaxed">{item.description}</p>
                        </div>
                      ))}
                    </div>

                    {/* Highlight */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <p className="text-center text-sm font-bold text-[#303854]">
                        ✨ <span className="text-[#303854]">{PRODUCT_CONFIGS[handle].descriptionItems.length} productos en 1 kit</span> - Todo lo que necesitas
                      </p>
                    </div>
                  </div>
                )}

              </div>
            ) : (
              <div className="prose prose-sm text-gray-600 max-w-none" dangerouslySetInnerHTML={{ __html: sanitizeHtml(product.descriptionHtml || `<p>${product.description}</p>`) }} />
            )}
          </div>
        </div>

      </div>

      {handle === 'kit-premium-de-paseo-para-perros' && (
        <>
          {/* Gifs + Table (left) and Progress circles (right) */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-12 md:pb-16">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
              {/* Left: Gifs + Comparison Table */}
              <div>
                {/* Before/After with Gifs */}
                <div className="relative bg-gradient-to-r from-amber-800 to-pink-400 rounded-3xl overflow-hidden shadow-xl">
                  <div className="flex">
                    <div className="flex-1 relative">
                      <Image src="/gifperro2.gif" alt="Antes" width={320} height={320} className="w-full h-80 object-cover" />
                    </div>
                    <div className="w-1 bg-white/30"></div>
                    <div className="flex-1 relative">
                      <Image src="/gifperro1.gif" alt="Después" width={320} height={320} className="w-full h-80 object-cover" />
                    </div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 text-gray-800">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                </div>

                {/* Comparison Table */}
                <div className="mt-8 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#303854] text-white">
                        <th className="px-6 py-4 text-left font-bold">Sin Bebedero Portátil</th>
                        <th className="px-6 py-4 text-left font-bold">Con Bebedero Portátil</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="px-6 py-4 text-sm text-gray-700">Toma agua de charcos o lugares sucios.</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Siempre toma agua limpia y fresca.</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-6 py-4 text-sm text-gray-700">Puede pasar horas sin hidratarse.</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Hidratación inmediata en cualquier lugar.</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-6 py-4 text-sm text-gray-700">Tenés que llevar botella y recipiente por separado.</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Todo en un solo producto, práctico y liviano.</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-700">Mayor riesgo de bacterias y enfermedades.</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Más seguridad y bienestar en cada paseo.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right: Headline + Percentage circles */}
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-[#303854] mb-4 leading-tight">
                  Resultados que hablan por sí solos
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-10">
                  Cientos de clientes ya disfrutan de paseos más cómodos y felices con sus mascotas siempre hidratadas.
                </p>
                <div className="space-y-6">
                  {[
                    { percent: 94, text: 'recomendaría el producto' },
                    { percent: 96, text: 'notó a su mascota más hidratada' },
                    { percent: 95, text: 'lo volvería a comprar' },
                  ].map((item) => {
                    const radius = 42;
                    const circumference = 2 * Math.PI * radius;
                    const offset = circumference - (item.percent / 100) * circumference;
                    return (
                      <div key={item.percent} className="flex items-center gap-5 border-b border-gray-100 pb-6 last:border-b-0">
                        <div className="relative w-24 h-24 flex-shrink-0">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="8" />
                            <circle
                              cx="50" cy="50" r={radius}
                              fill="none"
                              stroke="#303854"
                              strokeWidth="8"
                              strokeLinecap="round"
                              strokeDasharray={circumference}
                              strokeDashoffset={offset}
                            />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-xl font-black text-[#303854]">
                            {item.percent}%
                          </span>
                        </div>
                        <p className="text-lg text-gray-700">{item.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <PainPointSection
            title="Tu perro merece agua limpia en cada paseo"
            subtitle="Descubrí por qué miles de dueños ya no salen sin la botella portátil."
            cardTitle="Los paseos sin agua pueden ser peligrosos."
            bullets={[
              'Tu perro toma de charcos sucios y después tiene problemas digestivos o infecciones.',
              'Se deshidrata rápido en días calurosos y termina exhausto antes de tiempo.',
              'Las botellas comunes gotean, mojan tu mochila y ensucias todo lo que cargás.',
              'Querés disfrutar del paseo, no estar pendiente de si tiene sed o está enfermo.',
            ]}
            beforeSrc="/perroagua.jpg"
            afterSrc="/perrocansado.jpg"
          />

          <ProductReviews reviews={productReviews} />

          {/* FAQ Section */}
          <div className="mt-16 mb-16 max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-wider text-[#7DB8E8] font-bold mb-2">Preguntas Frecuentes</p>
              <h3 className="text-4xl font-black text-[#303854]">FAQ</h3>
            </div>
            <div className="space-y-0 border-t border-gray-200">
              {[
                {
                  question: "¿Es apto para perros y gatos?",
                  answer: "Sí. Es ideal tanto para perros como para gatos de todos los tamaños."
                },
                {
                  question: "¿Pierde agua o gotea?",
                  answer: "No. Cuenta con un sistema de bloqueo que evita pérdidas de agua cuando está guardado en la mochila o el bolso."
                },
                {
                  question: "¿Es seguro para mi mascota?",
                  answer: "Sí. Está fabricado con materiales resistentes y seguros para el contacto con agua potable."
                },
                {
                  question: "¿Cómo se limpia?",
                  answer: "Se limpia fácilmente con agua y jabón neutro. Se recomienda lavarlo regularmente para mantener una correcta higiene."
                },
                {
                  question: "¿Qué medios de pago aceptan?",
                  answer: "Podés pagar con tarjeta de crédito, débito y otros medios de pago disponibles al finalizar la compra. Además, podés aprovechar las 3 cuotas sin interés."
                },
                {
                  question: "¿Realizan envíos a todo el país?",
                  answer: "Sí. Realizamos envíos a toda Argentina para que recibas tu pedido en la puerta de tu casa."
                },
                {
                  question: "¿Como me contacto con ustedes?",
                  answer: "Podés contactarnos a través de nuestro número de WhatsApp, o vía Gmail en la sección de contacto."
                }
              ].map((faq, index) => (
                <details key={index} className="group border-b border-gray-200">
                  <summary className="flex items-center justify-between cursor-pointer font-bold text-[#303854] text-base select-none hover:text-[#7DB8E8] transition-colors py-5 px-0">
                    <span className="flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#303854]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.546-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {faq.question}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#303854] group-open:rotate-180 transition-transform flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </summary>
                  <div className="mt-2 text-base text-gray-700 pb-5 pl-8">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </>
      )}

      {handle === 'kit-argentina-mundial-2026' && (
        <section className="relative py-20 md:py-28 bg-[#7DB8E8]">
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
                <div className="inline-block px-3 py-1 rounded-full mb-4 bg-orange-100">
                  <span className="text-xs font-black uppercase tracking-widest text-[#303854]">La Solución</span>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-[#303854] mb-6 leading-tight">
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
                      <svg className="w-6 h-6 shrink-0 mt-0.5 text-[#7DB8E8]" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
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
                className="inline-block font-black py-4 px-8 md:px-12 rounded-2xl text-lg md:text-xl transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-xl bg-white text-[#7DB8E8] hover:bg-orange-50"
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
