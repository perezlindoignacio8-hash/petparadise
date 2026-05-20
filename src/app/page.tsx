'use client';

import { useState, useEffect } from 'react';
import HomeHero from '@/components/HomeHero';
import PainPointSection from '@/components/PainPointSection';
import ReviewsSection from '@/components/ReviewsSection';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isArgentinaSlide = currentSlide === 1;

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  return (
    <>
      <HomeHero key="home-hero" onSlideChange={setCurrentSlide} />

      <PainPointSection
        ctaHref="/producto/kit-premium-de-paseo-para-perros"
        argentinaCtaHref="/producto/kit-argentina-mundial-2026"
        isArgentina={isArgentinaSlide}
      />

      <ReviewsSection />

      {/* CTA to catalog */}
      <div className="text-center mt-10 px-4">
        <a
          href="/catalogo"
          className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-500 transform hover:scale-105 shadow-lg ${
            isArgentinaSlide
              ? 'bg-sky-400 hover:bg-sky-500 text-white'
              : 'bg-gray-900 hover:bg-gray-800 text-white'
          }`}
          id="view-all-products"
        >
          Ver todos los productos
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>

      {/* Benefits Section */}
      <section className={`py-12 md:py-16 transition-colors duration-500 ${
        isArgentinaSlide ? 'bg-sky-50' : 'bg-gray-50'
      }`} id="benefits">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Shipping */}
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                isArgentinaSlide ? 'bg-sky-50' : 'bg-red-50'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-7 h-7 ${
                  isArgentinaSlide ? 'text-sky-400' : 'text-red-600'
                }`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Envíos Gratis</h3>
              <p className="text-sm text-gray-500">En todos tus pedidos a todo el país</p>
            </div>

            {/* Installments */}
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                isArgentinaSlide ? 'bg-sky-50' : 'bg-red-50'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-7 h-7 ${
                  isArgentinaSlide ? 'text-sky-400' : 'text-red-600'
                }`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">3 Cuotas Sin Interés</h3>
              <p className="text-sm text-gray-500">Con todas las tarjetas de crédito</p>
            </div>

            {/* Support */}
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                isArgentinaSlide ? 'bg-sky-50' : 'bg-red-50'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-7 h-7 ${
                  isArgentinaSlide ? 'text-sky-400' : 'text-red-600'
                }`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Atención Personalizada</h3>
              <p className="text-sm text-gray-500">Respondemos todas tus consultas por WhatsApp</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
