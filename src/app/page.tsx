'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import HomeHero from '@/components/HomeHero';
import BotellaPortatil from '@/components/BotellaPortatil';
import PainPointSection from '@/components/PainPointSection';
import ReviewsSection from '@/components/ReviewsSection';
import ArgentinaShowcase from '@/components/ArgentinaShowcase';
import ProductCard from '@/components/ProductCard';
import { getProductByHandle } from '@/lib/shopify';
import type { Product } from '@/types/shopify';

export default function HomePage() {
  const [, setCurrentSlide] = useState(0);
  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);
  const isArgentinaSlide = false;

  useEffect(() => {
    getProductByHandle('kit-premium-de-paseo-para-perros').then((p) => {
      if (p) setFeaturedProduct(p);
    });
  }, []);

  return (
    <>
      <HomeHero key="home-hero" onSlideChange={setCurrentSlide} />

      {/* Featured Product Card */}
      {featuredProduct && (
        <section className="py-12 md:py-16 bg-white" id="featured-product">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
                Nuestro producto estrella
              </h2>
              <p className="text-gray-500 text-sm">Todo lo que tu mascota necesita en un solo kit</p>
            </div>
            <ProductCard product={featuredProduct} />
          </div>
        </section>
      )}

      <PainPointSection
        ctaHref="/producto/kit-premium-de-paseo-para-perros"
        argentinaCtaHref="/producto/kit-argentina-mundial-2026"
        isArgentina={isArgentinaSlide}
      />

      <ReviewsSection isArgentina={isArgentinaSlide} />

      {isArgentinaSlide && <ArgentinaShowcase />}
      {!isArgentinaSlide && <BotellaPortatil />}


      {/* Why Us Section - Premium Benefits */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-white" id="why-us">
        {/* Decorative paws */}
        <svg className="absolute top-16 left-4 md:left-24 w-16 h-16 md:w-24 md:h-24 text-blue-100 opacity-60 select-none" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M4.5 9.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm11 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0ZM8 5.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm4 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm-3.5 8c0-2 1.5-3.5 3.5-3.5s3.5 1.5 3.5 3.5c0 1.5-.5 2.5-1.5 3.5l-2 2-2-2c-1-1-1.5-2-1.5-3.5Z" />
        </svg>
        <svg className="absolute top-16 right-4 md:right-24 w-16 h-16 md:w-24 md:h-24 text-blue-100 opacity-60 select-none" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M4.5 9.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm11 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0ZM8 5.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm4 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm-3.5 8c0-2 1.5-3.5 3.5-3.5s3.5 1.5 3.5 3.5c0 1.5-.5 2.5-1.5 3.5l-2 2-2-2c-1-1-1.5-2-1.5-3.5Z" />
        </svg>

        {/* Decorative heart sketches */}
        <svg className="hidden md:block absolute top-1/3 right-24 w-20 h-20 text-blue-200 opacity-70" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden>
          <path d="M30 40 Q50 20 70 40 Q70 60 50 75 Q30 60 30 40 Z" />
          <path d="M80 25 L85 20 M82 35 L88 32 M88 18 L93 13" />
        </svg>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Title */}
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight text-slate-900 font-serif">
              ¿Por qué elegir Pet Paradise?
            </h2>

            {/* Divider with heart */}
            <div className="flex items-center justify-center gap-3 mt-5">
              <span className="h-px w-20 md:w-32 bg-blue-300"></span>
              <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 21s-7-4.5-9.5-9C1 8.5 3 5 6.5 5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 3.5 0 5.5 3.5 4 7-2.5 4.5-9.5 9-9.5 9Z" />
              </svg>
              <span className="h-px w-20 md:w-32 bg-blue-300"></span>
            </div>

            <p className="text-gray-500 mt-4 text-sm md:text-base max-w-2xl mx-auto">
              Todo lo que tu mascota necesita, con el amor y la confianza que se merece.
            </p>
          </div>

          {/* Cards with dog image */}
          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:pr-32">
            {/* Premium Quality */}
            <div className="group text-center p-5 md:p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 bg-blue-100">
                <div className="text-3xl md:text-4xl">🐾</div>
              </div>
              <h3 className="font-black text-gray-900 mb-2 md:mb-3 text-sm md:text-base leading-tight">Productos seleccionados con calidad premium</h3>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed">Porque tu mascota merece lo mejor en comodidad, diversión y cuidado.</p>
            </div>

            {/* Customer Satisfaction */}
            <div className="group text-center p-5 md:p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 bg-pink-100">
                <div className="text-3xl md:text-4xl">❤️</div>
              </div>
              <h3 className="font-black text-gray-900 mb-2 md:mb-3 text-sm md:text-base leading-tight">Miles de clientes satisfechos</h3>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed">Elegidos por familias que buscan productos útiles, originales y confiables.</p>
            </div>

            {/* Secure Payments */}
            <div className="group text-center p-5 md:p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 bg-green-100">
                <div className="text-3xl md:text-4xl">🔒</div>
              </div>
              <h3 className="font-black text-gray-900 mb-2 md:mb-3 text-sm md:text-base leading-tight">Pagos 100% seguros</h3>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed">Comprá con tranquilidad gracias a métodos de pago protegidos y confiables.</p>
            </div>

            {/* Pet Lovers Experience */}
            <div className="group text-center p-5 md:p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 bg-yellow-100">
                <div className="text-3xl md:text-4xl">✨</div>
              </div>
              <h3 className="font-black text-gray-900 mb-2 md:mb-3 text-sm md:text-base leading-tight">Experiencia pensada para amantes de las mascotas</h3>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed">Cada detalle de Pet Paradise está creado para hacer feliz a tu compañero peludo.</p>
            </div>
          </div>

          {/* Dog image overlapping right */}
          <div className="absolute -right-6 md:-right-12 -bottom-16 md:-bottom-24 w-32 h-32 md:w-80 md:h-80 pointer-events-none">
            <Image
              src="/golden.png"
              alt="Cachorro Golden"
              width={320}
              height={320}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section - Additional Services */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-blue-50" id="benefits">
        {/* Decorative bone left */}
        <div className="absolute -left-4 md:-left-10 bottom-4 md:bottom-8 w-24 h-24 md:w-44 md:h-44 rotate-[-25deg] pointer-events-none">
          <Image
            src="/huesosinfondo.png"
            alt=""
            width={176}
            height={176}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Decorative rope toy right */}
        <div className="absolute -right-4 md:-right-10 bottom-4 md:bottom-8 w-28 h-28 md:w-52 md:h-52 rotate-[20deg] pointer-events-none">
          <Image
            src="/cuerda.jpg"
            alt=""
            width={208}
            height={208}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Decorative wavy lines */}
        <svg className="hidden md:block absolute top-12 left-1/4 w-32 h-8 text-blue-300 opacity-60" viewBox="0 0 200 30" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M0 15 Q 25 0 50 15 T 100 15 T 150 15 T 200 15" />
        </svg>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header with heart divider */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-12 bg-blue-300"></span>
              <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 21s-7-4.5-9.5-9C1 8.5 3 5 6.5 5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 3.5 0 5.5 3.5 4 7-2.5 4.5-9.5 9-9.5 9Z" />
              </svg>
              <span className="h-px w-12 bg-blue-300"></span>
            </div>
            <h3 className="text-2xl md:text-4xl font-black text-slate-900 font-serif">
              Ventajas exclusivas para vos
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative">
            {/* Free Shipping */}
            <div className="text-center p-6 md:p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-blue-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-7 h-7 md:w-8 md:h-8 text-blue-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <h3 className="font-black text-gray-900 mb-2 text-base md:text-lg">Envíos Gratis</h3>
              <p className="text-sm text-gray-500">En pedidos seleccionados a todo el país.</p>
            </div>

            {/* Installments */}
            <div className="text-center p-6 md:p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-blue-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-7 h-7 md:w-8 md:h-8 text-blue-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                </svg>
              </div>
              <h3 className="font-black text-gray-900 mb-2 text-base md:text-lg">3 Cuotas Sin Interés</h3>
              <p className="text-sm text-gray-500">Con todas las tarjetas de crédito.</p>
            </div>

            {/* Support */}
            <div className="text-center p-6 md:p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-blue-100">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 md:w-8 md:h-8 text-blue-500">
                  <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.062 12.062 0 0 0 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411l.015-.039Zm-8.47 18.297c-1.741 0-3.453-.466-4.95-1.357l-.354-.21-3.683.964.985-3.585-.232-.367a9.866 9.866 0 0 1-1.518-5.273c0-5.45 4.455-9.884 9.928-9.884 2.653 0 5.146 1.033 7.022 2.903a9.851 9.851 0 0 1 2.906 6.987c-.003 5.45-4.459 9.881-9.932 9.881h-.172v-.059Z" />
                </svg>
              </div>
              <h3 className="font-black text-gray-900 mb-2 text-base md:text-lg">Atención Personalizada</h3>
              <p className="text-sm text-gray-500">Respondemos todas tus consultas por WhatsApp.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
