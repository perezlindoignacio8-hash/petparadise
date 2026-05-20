'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

interface HeroBannerProps {
  onSlideChange?: (index: number) => void;
}

export default function HeroBanner({ onSlideChange }: HeroBannerProps = {}) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const total = 2;

  useEffect(() => {
    // Resetear al slide 0 cuando el componente se monta
    setCurrent(0);
  }, []);

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
      className="relative overflow-hidden w-full aspect-[1274/1235] sm:aspect-[1740/904] sm:max-h-[70vh] xl:max-h-[700px]"
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
            priority
            className="object-cover object-top sm:hidden"
            sizes="100vw"
          />
          {/* Desktop */}
          <Image
            src="/bannernasi.png"
            alt="Kit Premium de Paseo para Perros"
            fill
            priority
            className="object-cover object-bottom hidden sm:block"
            sizes="100vw"
          />
        </div>
        {/* CTA Button — mobile only, posicionado sobre el botón pintado en la imagen */}
        <Link
          href="/producto/kit-premium-de-paseo-para-perros"
          className="absolute bottom-[11%] left-[5%] z-30 sm:hidden inline-flex items-center gap-3 bg-red-600 text-white pl-7 pr-6 py-4 rounded-full font-black text-base uppercase tracking-wide shadow-lg active:scale-95 transition-transform"
          id="hero-cta-slide1-mobile"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          Comprar Ahora
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </Link>
        {/* CTA Button — desktop only, izquierda del texto "compra segura" */}
        <Link
          href="/producto/kit-premium-de-paseo-para-perros"
          className="absolute bottom-[6%] left-[9%] z-20 hidden sm:inline-flex items-center gap-3 bg-red-600 text-white pl-7 pr-6 py-4 rounded-full font-black text-base md:text-lg uppercase tracking-wide hover:bg-red-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 shadow-xl"
          id="hero-cta-slide1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          Comprar Ahora
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </Link>
      </div>

      {/* ── Slide 2: fondopagina1.png con textos ── */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${current === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
      >
        <Image
          src="/fondopagina1.png"
          alt="Pet Paradise Shop - Todo lo que tu mascota necesita"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 flex items-center">
          <div className="text-white space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none drop-shadow-lg">
                Pet Paradise
              </h1>
              <p className="text-2xl md:text-3xl font-bold text-red-200 mt-1 uppercase drop-shadow-md">
                Shop
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg md:text-xl font-bold italic drop-shadow-md">
                TODO LO QUE TU MASCOTA NECESITA
              </h2>
              <p className="text-sm md:text-base text-white/90 italic max-w-md leading-relaxed drop-shadow-sm">
                Encontrá productos de calidad y ofertas increíbles para hacer
                la vida de tu mejor amigo mas feliz!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center gap-2 bg-white text-red-600 px-8 py-3 rounded-full font-bold text-sm hover:bg-red-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                id="hero-cta-button"
              >
                Ver Tienda →
              </Link>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-5 py-2.5 text-sm text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              <span className="font-medium">342-477-0030</span>
            </div>
          </div>
        </div>
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
