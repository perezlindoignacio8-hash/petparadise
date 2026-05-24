'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface HeroBannerProps {
  onSlideChange?: (index: number) => void;
}

export default function HeroBanner({ onSlideChange }: HeroBannerProps = {}) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const total = 2;
  const router = useRouter();

  const handleBuyNow = async (productHandle: string) => {
    router.push(`/producto/${productHandle}?addToCart=1`);
  };

  useEffect(() => {
    onSlideChange?.(current);
  }, [current, onSlideChange]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };


  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next(); else prev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      className={`relative overflow-hidden w-full sm:max-h-[70vh] xl:max-h-[700px] ${
        current === 0
          ? 'aspect-[1274/1235] sm:aspect-[1740/904]'
          : 'aspect-[1274/1235] sm:aspect-[1740/1200]'
      }`}
      id="hero-banner"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Slide 1: banner.PNG ── */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${current === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
      >
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
        {/* CTA Button — mobile only, posicionado sobre el botón pintado en la imagen */}
        <button
          onClick={() => handleBuyNow('kit-premium-de-paseo-para-perros')}
          className="btn-shimmer absolute bottom-[11%] left-[5%] z-30 sm:hidden inline-flex items-center gap-3 bg-blue-600 text-white pl-7 pr-6 py-4 rounded-full font-black text-base uppercase tracking-wide shadow-lg active:scale-95 transition-transform hover:bg-blue-700"
          id="hero-cta-slide1-mobile"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          Comprar Ahora
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        {/* CTA Button — desktop only, izquierda del texto "compra segura" */}
        <button
          onClick={() => handleBuyNow('kit-premium-de-paseo-para-perros')}
          className="btn-shimmer absolute bottom-[6%] left-[9%] z-20 hidden sm:inline-flex items-center gap-3 bg-blue-600 text-white pl-7 pr-6 py-4 rounded-full font-black text-base md:text-lg uppercase tracking-wide hover:bg-blue-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 shadow-xl"
          id="hero-cta-slide1"
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

      {/* ── Slide 2: bannerlocura.png con botón y features ── */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${current === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
      >
        {/* Mobile */}
        <Image
          src="/banner2responsive.png"
          alt="Kit Argentina Mundial 2026"
          fill
          loading="lazy"
          quality={65}
          className="object-cover object-center sm:hidden"
          sizes="(max-width: 640px) 100vw, 0px"
        />
        {/* Desktop */}
        <Image
          src="/bannerlocura.png"
          alt="Kit Argentina Mundial 2026"
          fill
          loading="lazy"
          quality={65}
          className="object-cover object-center hidden sm:block"
          sizes="(min-width: 641px) 100vw, 0px"
        />
        {/* CTA Button — celeste y blanco */}
        <button
          onClick={() => handleBuyNow('kit-argentina-mundial-2026')}
          className="btn-shimmer absolute bottom-[11%] left-[5%] z-30 sm:hidden inline-flex items-center gap-3 bg-sky-400 text-white pl-7 pr-6 py-4 rounded-full font-black text-base uppercase tracking-wide shadow-lg active:scale-95 transition-transform hover:bg-sky-500"
          id="hero-cta-slide2-mobile"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          Comprar Ahora
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        {/* CTA Button — desktop, celeste y blanco */}
        <button
          onClick={() => handleBuyNow('kit-argentina-mundial-2026')}
          className="btn-shimmer absolute bottom-[6%] left-[9%] z-20 hidden sm:inline-flex items-center gap-3 bg-sky-400 text-white pl-7 pr-6 py-4 rounded-full font-black text-base md:text-lg uppercase tracking-wide hover:bg-sky-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 shadow-xl"
          id="hero-cta-slide2"
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

      {/* Arrow Controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-900 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
        aria-label="Slide anterior"
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-900 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
        aria-label="Siguiente slide"
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5L15.75 12l-7.5 7.5" />
        </svg>
      </button>

      {/* Dots navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === current ? 'bg-white scale-125 shadow-md' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Ir al slide ${i + 1}`}
            type="button"
          />
        ))}
      </div>
    </section>
  );
}
