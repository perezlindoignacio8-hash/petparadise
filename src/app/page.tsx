'use client';

import { useState } from 'react';
import HomeHero from '@/components/HomeHero';
import BotellaPortatil from '@/components/BotellaPortatil';
import PainPointSection from '@/components/PainPointSection';
import ReviewsSection from '@/components/ReviewsSection';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isArgentinaSlide = currentSlide === 1;

  return (
    <>
      <HomeHero key="home-hero" onSlideChange={setCurrentSlide} />

      <PainPointSection
        ctaHref="/producto/kit-premium-de-paseo-para-perros"
        argentinaCtaHref="/producto/kit-argentina-mundial-2026"
        isArgentina={isArgentinaSlide}
      />

      <ReviewsSection />

      {!isArgentinaSlide && <BotellaPortatil />}

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

      {/* Why Us Section - Premium Benefits */}
      <section className={`py-16 md:py-24 transition-colors duration-500 ${
        isArgentinaSlide ? 'bg-gradient-to-b from-white to-sky-50' : 'bg-gradient-to-b from-white to-slate-50'
      }`} id="why-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
              <span className="text-slate-900">¿Por qué elegir </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600">Pet Paradise</span>
              <span className="text-slate-900">?</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {/* Premium Quality */}
            <div className="group text-center p-4 md:p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-gray-100">
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 transition-all duration-500 ${
                isArgentinaSlide ? 'bg-sky-100 group-hover:bg-sky-200' : 'bg-slate-100 group-hover:bg-slate-200'
              }`}>
                <div className="text-4xl md:text-5xl">🐾</div>
              </div>
              <h3 className="font-black text-gray-900 mb-2 md:mb-3 text-xs md:text-lg">Productos seleccionados con calidad premium</h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">Porque tu mascota merece lo mejor en comodidad, diversión y cuidado.</p>
            </div>

            {/* Customer Satisfaction */}
            <div className="group text-center p-4 md:p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-gray-100">
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 transition-all duration-500 ${
                isArgentinaSlide ? 'bg-sky-100 group-hover:bg-sky-200' : 'bg-slate-100 group-hover:bg-slate-200'
              }`}>
                <div className="text-4xl md:text-5xl">❤️</div>
              </div>
              <h3 className="font-black text-gray-900 mb-2 md:mb-3 text-xs md:text-lg">Miles de clientes satisfechos</h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">Elegidos por familias que buscan productos útiles, originales y confiables.</p>
            </div>

            {/* Secure Payments */}
            <div className="group text-center p-4 md:p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-gray-100">
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 transition-all duration-500 ${
                isArgentinaSlide ? 'bg-sky-100 group-hover:bg-sky-200' : 'bg-slate-100 group-hover:bg-slate-200'
              }`}>
                <div className="text-4xl md:text-5xl">🔒</div>
              </div>
              <h3 className="font-black text-gray-900 mb-2 md:mb-3 text-xs md:text-lg">Pagos 100% seguros</h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">Comprá con tranquilidad gracias a métodos de pago protegidos y confiables.</p>
            </div>

            {/* Pet Lovers Experience */}
            <div className="group text-center p-4 md:p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-gray-100">
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 transition-all duration-500 ${
                isArgentinaSlide ? 'bg-sky-100 group-hover:bg-sky-200' : 'bg-slate-100 group-hover:bg-slate-200'
              }`}>
                <div className="text-4xl md:text-5xl">✨</div>
              </div>
              <h3 className="font-black text-gray-900 mb-2 md:mb-3 text-xs md:text-lg">Experiencia pensada para amantes de las mascotas</h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">Cada detalle de Pet Paradise está creado para hacer feliz a tu compañero peludo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Additional Services */}
      <section className={`py-12 md:py-16 transition-colors duration-500 ${
        isArgentinaSlide ? 'bg-sky-50' : 'bg-gray-50'
      }`} id="benefits">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Divider line */}
          <div className={`border-t transition-colors duration-500 mb-10 md:mb-14 ${
            isArgentinaSlide ? 'border-sky-100' : 'border-gray-200'
          }`}></div>

          <div className="text-center mb-10 md:mb-12">
            <h3 className={`text-2xl md:text-3xl font-black transition-colors duration-500 ${
              isArgentinaSlide ? 'text-sky-600' : 'text-slate-800'
            }`}>
              Ventajas exclusivas para vos
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {/* Free Shipping */}
            <div className="text-center p-3 md:p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 ${
                isArgentinaSlide ? 'bg-sky-50' : 'bg-slate-50'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 md:w-7 md:h-7 ${
                  isArgentinaSlide ? 'text-sky-400' : 'text-slate-800'
                }`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 md:mb-2 text-xs md:text-base">Envíos Gratis</h3>
              <p className="text-xs md:text-sm text-gray-500">En pedidos seleccionados a todo el país</p>
            </div>

            {/* Installments */}
            <div className="text-center p-3 md:p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 ${
                isArgentinaSlide ? 'bg-sky-50' : 'bg-slate-50'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 md:w-7 md:h-7 ${
                  isArgentinaSlide ? 'text-sky-400' : 'text-slate-800'
                }`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 md:mb-2 text-xs md:text-base">3 Cuotas Sin Interés</h3>
              <p className="text-xs md:text-sm text-gray-500">Con todas las tarjetas de crédito</p>
            </div>

            {/* Support */}
            <div className="text-center p-3 md:p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 ${
                isArgentinaSlide ? 'bg-sky-50' : 'bg-slate-50'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 md:w-7 md:h-7 ${
                  isArgentinaSlide ? 'text-sky-400' : 'text-slate-800'
                }`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 md:mb-2 text-xs md:text-base">Atención Personalizada</h3>
              <p className="text-xs md:text-sm text-gray-500">Respondemos todas tus consultas por WhatsApp</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
