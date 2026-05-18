'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductByHandle, formatPrice } from '@/lib/shopify';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types/shopify';
import CountdownTimer from '@/components/CountdownTimer';

export default function ProductoPage() {
  const params = useParams();
  const handle = params.handle as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    if (handle) {
      getProductByHandle(handle).then((p) => {
        setProduct(p);
        setLoading(false);
      });
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
        <Link href="/catalogo" className="bg-red-600 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-red-700 transition-colors">
          Volver al catálogo
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-400">
        <Link href="/" className="hover:text-red-600 transition-colors">Inicio</Link>
        <span className="mx-2">/</span>
        <Link href="/catalogo" className="hover:text-red-600 transition-colors">Catálogo</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 relative">
            {hasDiscount && (
              <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-sm font-bold px-3 py-1.5 rounded-full">
                OFERTA
              </div>
            )}
            {/* Free shipping badge */}
            <div className="absolute top-4 right-4 z-10 bg-red-600 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              GRATIS
            </div>
            {isDemo ? (
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
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${i === selectedImage ? 'border-red-600 shadow-md' : 'border-gray-200 hover:border-gray-400'}`}>
                  <Image src={img.url} alt={img.altText || ''} width={80} height={80} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-red-600 font-medium mb-1">{product.productType || 'Pet Paradise'}</p>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900">{product.title}</h1>
          </div>

          <div>
            <div className="flex items-center gap-3 flex-wrap">
              {hasDiscount && (
                <span className="text-xl text-gray-400 line-through">{formatPrice(compareAt.amount, compareAt.currencyCode)}</span>
              )}
              <span className={`text-3xl font-black ${hasDiscount ? 'text-red-600' : 'text-gray-900'}`}>
                {formatPrice(price.amount, price.currencyCode)}
              </span>
              {hasDiscount && (
                <span className="bg-red-600 text-white text-sm font-black px-3 py-1 rounded-full">
                  -{Math.round((1 - parseFloat(price.amount) / parseFloat(compareAt.amount)) * 100)}% OFF
                </span>
              )}
            </div>
            <p className="text-sm text-green-600 font-medium mt-1">
              3 cuotas sin interés x {formatPrice((parseFloat(price.amount) / 3).toFixed(2), price.currencyCode)}
            </p>
          </div>

          <div className="prose prose-sm text-gray-600 max-w-none" dangerouslySetInnerHTML={{ __html: product.descriptionHtml || `<p>${product.description}</p>` }} />

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Cantidad:</span>
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">−</button>
              <span className="w-12 h-10 flex items-center justify-center font-bold text-sm border-x border-gray-200">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">+</button>
            </div>
          </div>

          {/* Add to Cart */}
          <button onClick={() => addItem(product, quantity)}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.01] active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-base"
            id="add-to-cart-detail">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            Agregar al carrito
          </button>

          {/* WhatsApp */}
          <a href={`https://wa.me/543424770030?text=Hola! Quiero consultar sobre: ${product.title}`}
            target="_blank" rel="noopener noreferrer"
            className="w-full border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Consultar por WhatsApp
          </a>

          <CountdownTimer />
        </div>
      </div>

      {/* ── Qué contiene el kit ── solo para el kit de paseo */}
      {handle === 'kit-premium-de-paseo-para-perros' && (
      <div className="mt-12 md:mt-16">
        {/* Header */}
        <div className="bg-red-600 rounded-2xl px-6 py-4 flex items-center justify-center gap-3 mb-8">
          <span className="text-xl">📦</span>
          <h2 className="text-white font-black text-lg md:text-xl uppercase tracking-wide">
            ¿Qué contiene nuestro Kit de Paseo?
          </h2>
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Item 1 */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💧</span>
            </div>
            <h3 className="font-black text-gray-900 text-base mb-2">Botella Portátil</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Dispensador de agua antigoteo con capacidad ideal para paseos largos. Liviana y fácil de usar con una sola mano.
            </p>
            <div className="mt-3 inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
              ✓ Incluido en el kit
            </div>
          </div>

          {/* Item 2 */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🧹</span>
            </div>
            <h3 className="font-black text-gray-900 text-base mb-2">Juntador de Excrementos</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Práctico y discreto. Olvidate de los paseos incómodos, lleva las bolsas siempre a mano sin ocupar espacio.
            </p>
            <div className="mt-3 inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
              ✓ Incluido en el kit
            </div>
          </div>

          {/* Item 3 */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎁</span>
            </div>
            <h3 className="font-black text-gray-900 text-base mb-2">Chaleco de Regalo</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Chaleco para el frío incluido sin costo adicional. El regalo perfecto para que tu mascota esté cómoda en cada salida.
            </p>
            <div className="mt-3 inline-flex items-center gap-1 bg-red-50 text-red-600 text-xs font-bold px-3 py-1 rounded-full">
              🎁 ¡De regalo!
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
