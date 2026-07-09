'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const reviewsDefault = [
  {
    name: 'Lucía F.',
    location: 'Rosario',
    avatar: '/foto1.jpg',
    stars: 5,
    text: '"Al principio dudé xq compré una parecida en otro lado y fue un desastre. Esta no, funciona re bien. La llevo al parque todos los días con mi labradora y ni una gota cae. Ya se la recomendé a dos amigas 🐾"',
  },
  {
    name: 'Sebastián T.',
    location: 'Mendoza',
    avatar: '/foto2.jpg',
    stars: 5,
    text: '"Salgo a correr con mi perro todos los días y esto me cambió la vida jaja. Antes llevaba una botellita aparte y era un quilombo. Ahora con esto listo, fácil y no pesa nada. Buena compra 👍"',
  },
  {
    name: 'Carolina M.',
    location: 'Córdoba',
    avatar: '/foto3.jpg',
    stars: 5,
    text: '"Compré 2, una para mí y otra para mi cuñada que tiene un golden. Las dos funcionan perfecto. Lo único que diría es que tarda un poco en llegar pero valió la espera, la calidad es muy buena"',
  },
  {
    name: 'Martín G.',
    location: 'Buenos Aires',
    avatar: '/foto5.jpg',
    stars: 5,
    text: '"Mira yo soy de los que no compra por internet pero mi señora me convenció. La verdad que sorprendió. El perro tomó agua desde el primer intento sin drama. No gotea ni nada. Llegó bien embalada también"',
  },
  {
    name: 'Valentina R.',
    location: 'Santa Fe',
    avatar: '/foto4.jpg',
    stars: 5,
    text: '"re linda la botella!! mi bulldog se calienta mucho y con esto puedo darle agua en cualquier momento. antes paraba en cada lugar a pedir agua jajaja. lo único es q el perro al principio no entendía pero después aprendió solo"',
  },
  {
    name: 'Diego P.',
    location: 'La Plata',
    avatar: '/foto6.jpg',
    stars: 5,
    text: '"Se la compré a mi hija para los paseos y quedó re contenta. La botella aguantó todo, hasta cuando el perro la tiró al piso jaja. Buen precio, buena calidad. Volvería a pedir sin dudas 🐶"',
  },
];

const reviewsArgentina = [
  {
    name: 'Florencia M.',
    location: 'Buenos Aires',
    avatar: '/fotomujer2.jpg',
    stars: 5,
    text: '"¡Quedó increíble mi caniche con la pechera! 🇦🇷 Para el último amistoso lo vestimos a juego con toda la familia y nos sacamos mil fotos. La tela es re suave y abriga bien 💙"',
  },
  {
    name: 'Joaquín R.',
    location: 'Córdoba',
    avatar: '/fotohombre3.jpg',
    stars: 5,
    text: '"La compré pensando que iba a ser una más, pero la calidad me sorprendió. Mi golden la usa sin problema, no le molesta nada. Encima la bandana de regalo quedó hermosa ⚽"',
  },
  {
    name: 'Camila S.',
    location: 'Rosario',
    avatar: '/fotomujer3.jpg',
    stars: 5,
    text: '"Soy fan del mundial y ahora mi pug también jaja. La pechera le entra perfecto, no le aprieta. Para los partidos importantes ya tenemos uniforme de la familia completo 🐶🇦🇷"',
  },
  {
    name: 'Nicolás T.',
    location: 'Mendoza',
    avatar: '/fotohombre1.jpg',
    stars: 5,
    text: '"Re buena compra. Mi mujer la pidió para nuestro labrador y quedó re contenta. La pelotita de regalo le encantó al perro, juega todo el día con eso. Llegó rápido y bien embalado"',
  },
  {
    name: 'Agustina P.',
    location: 'La Plata',
    avatar: '/fotomujer1.jpg',
    stars: 5,
    text: '"Hermosa la pechera!! Mi chihuahua parece de selección 😍 La tela es polar, abriga mucho, ideal para el invierno. Y los regalitos que vienen son un golazo. Súper recomendado 💙🤍"',
  },
  {
    name: 'Federico L.',
    location: 'Santa Fe',
    avatar: '/fotohombre2.jpg',
    stars: 5,
    text: '"Le compré el kit a mi border collie y la verdad que está re cómodo. Lo uso para las juntadas con amigos a ver los partidos y siempre se lleva todas las miradas 🏆 Vale cada peso"',
  },
];

type Review = (typeof reviewsDefault)[number];

function ReviewCard({ review, className = '' }: { review: Review; className?: string }) {
  return (
    <div className={`bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col items-center text-center ${className}`}>
      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: review.stars }).map((_, s) => (
          <svg key={s} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-amber-400">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
          </svg>
        ))}
      </div>

      {/* Avatar */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={review.avatar}
        alt={review.name}
        className="w-16 h-16 rounded-full object-cover border-2 border-slate-100 mb-4"
      />

      <p className="font-bold text-[#303854] text-sm">
        {review.name} — <span className="font-normal text-gray-500">{review.location}</span>
      </p>

      <p className="text-gray-600 text-sm leading-relaxed mt-3 italic">{review.text}</p>

      <p className="text-[#303854] text-xs font-semibold mt-4 flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
          <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
        </svg>
        COMPRA VERIFICADA
      </p>
    </div>
  );
}

interface ReviewsSectionProps {
  isArgentina?: boolean;
}

export default function ReviewsSection({ isArgentina = false }: ReviewsSectionProps = {}) {
  const reviews = isArgentina ? reviewsArgentina : reviewsDefault;
  const PAGES = [reviews.slice(0, 3), reviews.slice(3, 6)];
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = PAGES.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 4500);
  }, [next]);

  useEffect(() => {
    resetInterval();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [resetInterval]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next(); else prev();
      resetInterval();
    }
    touchStartX.current = null;
  };

  const pageReviews = PAGES[current];

  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-[#303854] mb-2">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-gray-500 text-sm">
            {isArgentina
              ? 'Opiniones verificadas sobre el Kit Argentina Mundial 2026'
              : 'Opiniones verificadas sobre la Botella Portátil para Perros'}
          </p>
        </div>

        {/* MOBILE: scroll horizontal con snap */}
        <div className="md:hidden -mx-4 px-4 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-4">
            {reviews.map((review, i) => (
              <div key={i} className="snap-center shrink-0 w-[85vw] max-w-sm">
                <ReviewCard review={review} className="h-full" />
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP: grid paginado */}
        <div className="hidden md:block">
          <div
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="grid grid-cols-3 gap-6">
              {pageReviews.map((review, i) => (
                <ReviewCard
                  key={`page${current}-${i}`}
                  review={review}
                  className="animate-fade-in"
                />
              ))}
            </div>

            <button
              onClick={() => { prev(); resetInterval(); }}
              className="absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-all"
              aria-label="Anterior reseña"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => { next(); resetInterval(); }}
              className="absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-all"
              aria-label="Siguiente reseña"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {PAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); resetInterval(); }}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? 'bg-[#303854] w-5 h-2.5' : 'bg-gray-300 w-2.5 h-2.5 hover:bg-gray-400'
                }`}
                aria-label={`Reseña ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
