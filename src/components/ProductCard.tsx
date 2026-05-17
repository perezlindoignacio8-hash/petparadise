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

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 flex flex-col"
      id={`product-card-${product.handle}`}
    >
      {/* Image */}
      <Link href={`/producto/${product.handle}`} className="relative aspect-square overflow-hidden bg-gray-50">
        {hasDiscount && (
          <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg animate-pulse-subtle">
            -{discountPercentage}%
          </div>
        )}
        <div className="relative w-full h-full">
          {imageUrl.startsWith('/products/') ? (
            // Placeholder for demo products
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-red-50 group-hover:to-red-100 transition-colors duration-500">
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
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/producto/${product.handle}`}>
          <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4 mt-auto">
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)}
            </span>
          )}
          <span className={`text-lg font-bold ${hasDiscount ? 'text-red-600' : 'text-gray-900'}`}>
            {formatPrice(price.amount, price.currencyCode)}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addItem(product)}
          className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          id={`add-to-cart-${product.handle}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          Ver producto
        </button>
      </div>
    </div>
  );
}
