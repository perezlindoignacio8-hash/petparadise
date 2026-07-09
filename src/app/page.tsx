'use client';

import { useState, useEffect } from 'react';
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
              <h2 className="text-2xl md:text-3xl font-black text-[#303854] mb-2">
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
      <section className="py-20 md:py-28 bg-sky-50 border-t border-gray-100" id="why-us">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#303854] tracking-tight">
              ¿Por qué elegir Pet Paradise?
            </h2>
            <p className="text-gray-500 mt-4 text-base">
              Todo lo que tu mascota necesita, con el amor y la confianza que se merece.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-3xl mb-4">🐾</div>
              <h3 className="font-semibold text-[#303854] mb-2 text-sm md:text-base">Calidad premium</h3>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed">Productos seleccionados para tu mejor amigo.</p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-4">❤️</div>
              <h3 className="font-semibold text-[#303854] mb-2 text-sm md:text-base">Miles de clientes</h3>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed">Elegidos por familias en todo el país.</p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="font-semibold text-[#303854] mb-2 text-sm md:text-base">Pagos seguros</h3>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed">Métodos protegidos y confiables.</p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-4">✨</div>
              <h3 className="font-semibold text-[#303854] mb-2 text-sm md:text-base">Hecho con amor</h3>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed">Cada detalle pensado para tu mascota.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Additional Services */}
      <section className="py-20 md:py-28 bg-white border-t border-gray-100" id="benefits">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-[#303854] tracking-tight">
              Ventajas exclusivas
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#7DB8E8]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#303854] mb-2 text-base">Envíos Gratis</h3>
              <p className="text-sm text-gray-500">A todo el país en pedidos seleccionados.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#7DB8E8]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#303854] mb-2 text-base">3 Cuotas sin interés</h3>
              <p className="text-sm text-gray-500">Con todas las tarjetas de crédito.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#7DB8E8]">
                  <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.062 12.062 0 0 0 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411l.015-.039Zm-8.47 18.297c-1.741 0-3.453-.466-4.95-1.357l-.354-.21-3.683.964.985-3.585-.232-.367a9.866 9.866 0 0 1-1.518-5.273c0-5.45 4.455-9.884 9.928-9.884 2.653 0 5.146 1.033 7.022 2.903a9.851 9.851 0 0 1 2.906 6.987c-.003 5.45-4.459 9.881-9.932 9.881h-.172v-.059Z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#303854] mb-2 text-base">Atención por WhatsApp</h3>
              <p className="text-sm text-gray-500">Respondemos todas tus consultas.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
