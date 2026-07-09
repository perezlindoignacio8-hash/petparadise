'use client';

import Image from 'next/image';
import BeforeAfterSlider from './BeforeAfterSlider';

interface PainPointSectionProps {
  title?: string;
  subtitle?: string;
  cardTitle?: string;
  bullets?: string[];
  beforeSrc?: string;
  afterSrc?: string;
  showCTA?: boolean;
  ctaHref?: string;
  argentinaCtaHref?: string;
  isArgentina?: boolean;
}

export default function PainPointSection({
  title,
  subtitle,
  cardTitle,
  bullets,
  beforeSrc = '/perrobotella.jpg',
  afterSrc = '/perrocalle.jpg',
  showCTA = true,
  ctaHref,
  argentinaCtaHref,
  isArgentina = false,
}: PainPointSectionProps) {
  const baseCtaHref = isArgentina && argentinaCtaHref ? argentinaCtaHref : ctaHref;
  const finalCtaHref = baseCtaHref ? `${baseCtaHref}?addToCart=1` : baseCtaHref;
  const defaultTitle = <>¿Tu mascota merece <span className="underline decoration-white/40 decoration-4 underline-offset-4">más comodidad</span> en cada paseo?</>;
  const defaultSubtitle = 'Descubrí por qué miles de dueños eligen nuestro kit premium para sus mejores amigos.';
  const defaultCardTitle = 'Los paseos no deberían ser un dolor de cabeza.';

  const argentinaTitle = <>Tu perro también merece vivir el <span className="underline decoration-white/40 decoration-4 underline-offset-4">Mundial</span></>;

  const argentinaSubtitle = 'Vestí a tu mascota con los colores de Argentina y celebrá juntos la pasión por el fútbol, porque en casa celebramos todos.';
  const argentinaCardTitle = 'Tu perro merece representar a Argentina.';
  const defaultBullets = [
    'Tu perro toma agua de charcos o fuentes sucias en el paseo.',
    'Las botellas comunes gotean y te mojan toda la mochila.',
    'En paseos largos se queda sin agua y vuelve deshidratado.',
    'Y lo peor: pasás el paseo preocupado en vez de disfrutarlo.',
  ];

  const argentinaBullets = [
    'Tu perro merece sentirse parte de la familia durante el Mundial.',
    'Los colores de Argentina lo hacen sentir especial en cada paseo.',
    'Representa con orgullo a nuestro país junto a tu mejor amigo.',
    'Celebrá el fútbol y la amistad en una sola prenda.',
  ];

  return (
    <section className={`relative py-20 md:py-28 transition-colors duration-500 ${
      isArgentina ? 'bg-[#7DB8E8]' : 'bg-[#303854]'
    }`}>
      {/* Top wave */}
      <svg
        className="absolute top-0 left-0 w-full h-12 md:h-20 -translate-y-[1px]"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          fill="white"
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,0 L0,0 Z"
        />
      </svg>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Problema */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
            {title ?? (isArgentina ? argentinaTitle : defaultTitle)}
          </h2>
          <p className="text-white/90 text-base md:text-lg">
            {subtitle ?? (isArgentina ? argentinaSubtitle : defaultSubtitle)}
          </p>
        </div>

        {/* Two columns - Problema & Solución */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 items-center mb-16">
          {/* Left: white card with bullets - Solución */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl order-2 md:order-1">
            <div className={`inline-block px-3 py-1 rounded-full mb-4 ${
              isArgentina ? 'bg-orange-100' : 'bg-green-100'
            }`}>
              <span className={`text-xs font-black uppercase tracking-widest ${
                isArgentina ? 'text-[#303854]' : 'text-green-800'
              }`}>La Solución</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-[#303854] mb-6 leading-tight">
              {cardTitle ?? (isArgentina ? argentinaCardTitle : defaultCardTitle)}
            </h3>
            <ul className="space-y-4">
              {(bullets ?? (isArgentina ? argentinaBullets : defaultBullets)).map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700 text-sm md:text-base leading-relaxed">
                  <svg className={`w-6 h-6 shrink-0 mt-0.5 ${
                    isArgentina ? 'text-[#7DB8E8]' : 'text-green-600'
                  }`} fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: before/after slider or single image */}
          <div className="order-1 md:order-2">
            {isArgentina ? (
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/familiamundial.png"
                  alt="Familia Mundial 2026"
                  width={600}
                  height={600}
                  loading="lazy"
                  quality={65}
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="w-full h-auto object-cover"
                />
              </div>
            ) : (
              <BeforeAfterSlider
                beforeSrc={beforeSrc}
                afterSrc={afterSrc}
                beforeLabel="Antes"
                afterLabel="Después"
                intervalMs={6000}
              />
            )}
          </div>
        </div>

        {/* Social Proof */}
        <div className={`backdrop-blur border rounded-2xl p-8 mb-12 transition-colors duration-500 ${
          isArgentina
            ? 'bg-white/15 border-white/20'
            : 'bg-white/10 border-white/20'
        }`}>
          <div className="text-center mb-6">
            <span className="text-white text-sm font-bold uppercase tracking-widest">Prueba Social</span>
          </div>
          <div className="flex justify-center gap-6 md:gap-12">
            {[
              { stat: '+350', label: 'Clientes satisfechos' },
              { stat: '4.5★', label: 'Calificación promedio' },
              { stat: '100%', label: 'Garantía de satisfacción' },
            ].map((item) => (
              <div key={item.label} className="text-center flex-1">
                <div className="text-2xl md:text-3xl font-black text-white mb-2">{item.stat}</div>
                <p className="text-white/80 text-xs md:text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        {showCTA && (
          <div className="text-center">
            {finalCtaHref ? (
              <a
                href={finalCtaHref}
                className={`inline-block font-black py-4 px-8 md:px-12 rounded-2xl text-lg md:text-xl transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-xl ${
                  isArgentina
                    ? 'bg-white text-[#7DB8E8] hover:bg-orange-50'
                    : 'bg-white text-[#303854] hover:bg-gray-100'
                }`}>
                {isArgentina ? 'Alentar en familia' : 'Obtén tu Kit Premium Ahora'}
              </a>
            ) : (
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`bg-white font-black py-4 px-8 md:px-12 rounded-2xl text-lg md:text-xl transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-xl ${
                  isArgentina
                    ? 'text-[#7DB8E8] hover:bg-orange-50'
                    : 'text-[#303854] hover:bg-gray-100'
                }`}>
                {isArgentina ? 'Alentar en familia' : 'Obtén tu Kit Premium Ahora'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bottom wave */}
      <svg
        className="absolute bottom-0 left-0 w-full h-12 md:h-20 translate-y-[1px] rotate-180"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          fill="white"
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,0 L0,0 Z"
        />
      </svg>
    </section>
  );
}
