'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface HeroBannerProps {
  onSlideChange?: (index: number) => void;
}

export default function HeroBanner({ onSlideChange }: HeroBannerProps = {}) {
  const router = useRouter();

  const handleBuyNow = async (productHandle: string) => {
    router.push(`/producto/${productHandle}?addToCart=1`);
  };

  useEffect(() => {
    onSlideChange?.(0);
  }, [onSlideChange]);

  return (
    <section
      className="relative overflow-hidden w-full sm:max-h-[70vh] xl:max-h-[700px] aspect-[1274/1235] sm:aspect-[1740/904]"
      id="hero-banner"
    >
      {/* Botella Portátil */}
      <div className="absolute inset-0">
        <div className="block w-full h-full">
          {/* Mobile */}
          <Image
            src="/banner1responsive.png"
            alt="Kit Premium de Paseo para Perros"
            fill
            preload
            fetchPriority="high"
            quality={75}
            className="object-cover object-top sm:hidden"
            sizes="(max-width: 640px) 100vw, 0px"
          />
          {/* Desktop */}
          <Image
            src="/bannernasi.png"
            alt="Kit Premium de Paseo para Perros"
            fill
            preload
            fetchPriority="high"
            quality={75}
            className="object-cover object-bottom hidden sm:block"
            sizes="(min-width: 641px) 100vw, 0px"
          />
        </div>
        {/* CTA Button — mobile only */}
        <button
          onClick={() => handleBuyNow('kit-premium-de-paseo-para-perros')}
          className="btn-shimmer absolute bottom-[11%] left-[3%] z-30 sm:hidden inline-flex items-center gap-3 bg-[#303854] text-white pl-7 pr-6 py-4 rounded-full font-black text-base uppercase tracking-wide shadow-lg active:scale-95 transition-transform hover:bg-[#5AA0D8]"
          id="hero-cta-mobile"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          Comprar Ahora
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        {/* CTA Button — desktop only */}
        <button
          onClick={() => handleBuyNow('kit-premium-de-paseo-para-perros')}
          className="btn-shimmer absolute bottom-[6%] left-[9%] z-20 hidden sm:inline-flex items-center gap-3 bg-[#303854] text-white pl-7 pr-6 py-4 rounded-full font-black text-base md:text-lg uppercase tracking-wide hover:bg-[#5AA0D8] hover:shadow-2xl transition-all duration-300 transform hover:scale-105 shadow-xl"
          id="hero-cta"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          Comprar Ahora
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </section>
  );
}
