'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { formatPrice } from '@/lib/shopify';
import type { Product } from '@/types/shopify';
import { useCart } from '@/context/CartContext';

interface StickyProductBarProps {
  product: Product | null;
}

export default function StickyProductBar({ product }: StickyProductBarProps) {
  const [shouldShow, setShouldShow] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled && !shouldShow) {
        setIsAnimatingOut(false);
        setShouldShow(true);
      } else if (!isScrolled && shouldShow) {
        setIsAnimatingOut(true);
        const timer = setTimeout(() => setShouldShow(false), 300);
        return () => clearTimeout(timer);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [shouldShow]);

  if (!product || !shouldShow) return null;

  const price = product.priceRange.minVariantPrice;
  const compareAt = product.compareAtPriceRange?.minVariantPrice;
  const hasDiscount = compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount);
  const discountPercent = hasDiscount
    ? Math.round((1 - parseFloat(price.amount) / parseFloat(compareAt.amount)) * 100)
    : 0;

  const currentImage = product.images.edges[0]?.node || product.featuredImage;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 ${isAnimatingOut ? 'animate-slide-up' : 'animate-slide-down'}`} style={{ boxShadow: '0 -8px 24px rgba(0, 0, 0, 0.12)' }}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6">
        {/* Product Info */}
        <div className="flex items-center gap-3 sm:gap-5 flex-1 min-w-0">
          {currentImage && (
            <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-lg overflow-hidden bg-gray-100 shadow-md">
              <Image
                src={currentImage.url}
                alt={product.title}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-[#303854] text-sm sm:text-base truncate">{product.title}</h3>
            <div className="flex items-center gap-2 sm:gap-3 mt-1 sm:mt-2 flex-wrap">
              {hasDiscount && (
                <span className="text-xs sm:text-sm text-gray-500 line-through">
                  {formatPrice(compareAt.amount, compareAt.currencyCode)}
                </span>
              )}
              <span className="font-black text-xl sm:text-2xl text-[#303854]">
                {formatPrice(price.amount, price.currencyCode)}
              </span>
              {hasDiscount && (
                <span className="bg-[#303854] text-white text-xs sm:text-sm font-black px-2.5 py-1 rounded-full">
                  {discountPercent}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addItem(product, quantity)}
          className="shrink-0 w-full sm:w-auto bg-[#303854] hover:bg-[#1F2540] text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base whitespace-nowrap shadow-lg"
        >
          Añadir
        </button>
      </div>
    </div>
  );
}
