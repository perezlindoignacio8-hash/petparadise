'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/shopify';
import { formatPrice } from '@/lib/shopify';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const price = product.priceRange.minVariantPrice;
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice;
  const hasDiscount =
    compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount);

  const discountPercentage = hasDiscount
    ? Math.round(
        ((parseFloat(compareAtPrice.amount) - parseFloat(price.amount)) /
          parseFloat(compareAtPrice.amount)) *
          100
      )
    : 0;

  const imageUrl = product.featuredImage?.url || '/placeholder-product.jpg';

  const isFeatured = product.handle === 'kit-premium-de-paseo-para-perros';
  const isArgentina = product.handle === 'kit-argentina-mundial-2026';

  return (
    <div className="relative">
      {isFeatured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
          ⭐ Producto Estrella
        </div>
      )}
      {isArgentina && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-gradient-to-r from-sky-400 to-yellow-400 text-white text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
          🇦🇷 Mundial 2026
        </div>
      )}
    <div
      className={`group rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 flex flex-col h-full ${
        isArgentina
          ? 'bg-gradient-to-br from-sky-50 to-white border-sky-200'
          : 'bg-white border-gray-100'
      }`}
      id={`product-card-${product.handle}`}
    >
      {/* Image */}
      <Link href={`/producto/${product.handle}`} className="relative aspect-[4/5] overflow-hidden bg-gray-50 block w-full">
        {hasDiscount && (
          <div className={`absolute top-3 left-3 z-10 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg animate-pulse-subtle ${
            isArgentina ? 'bg-sky-400' : 'bg-slate-800'
          }`}>
            -{discountPercentage}%
          </div>
        )}
        {/* Free shipping badge */}
        <div className={`absolute top-3 right-3 z-10 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1 ${
          isArgentina ? 'bg-sky-400' : 'bg-slate-800'
        }`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
          </svg>
          GRATIS
        </div>
        <div className="relative w-full h-full">
          {imageUrl.startsWith('/products/') || (isArgentina && imageUrl === '/placeholder-product.jpg') ? (
            // Placeholder for demo products
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-slate-50 group-hover:to-slate-100 transition-colors duration-500">
              <div className="text-center p-4">
                <span className="text-5xl block mb-3">
                  {product.productType === 'Gatos' ? '🐱' : product.productType === 'Accesorios' ? '🎒' : '🐕'}
                </span>
                <p className="text-xs text-gray-400 font-medium">{product.title}</p>
              </div>
            </div>
          ) : (
            <Image
              src={imageUrl}
              alt={product.featuredImage?.altText || product.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <Link href={`/producto/${product.handle}`}>
            <h3 className="font-bold text-gray-900 text-sm mb-3 line-clamp-2 group-hover:text-slate-800 transition-colors">
              {product.title}
            </h3>
          </Link>

          {/* Price */}
          <div>
            <div className="flex items-center gap-2">
              {hasDiscount && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)}
                </span>
              )}
              <span className={`text-lg font-bold ${hasDiscount ? 'text-slate-800' : 'text-gray-900'}`}>
                {formatPrice(price.amount, price.currencyCode)}
              </span>
            </div>
            <p className="text-xs text-green-600 font-medium mt-0.5">
              3 cuotas sin interés x {formatPrice((parseFloat(price.amount) / 3).toFixed(2), price.currencyCode)}
            </p>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addItem(product)}
          className={`btn-shimmer w-full text-white text-sm font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-4 ${
            isArgentina
              ? 'bg-sky-400 hover:bg-sky-500'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          id={`add-to-cart-${product.handle}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          Añadir al carrito
        </button>
      </div>
    </div>
    </div>
  );
}
