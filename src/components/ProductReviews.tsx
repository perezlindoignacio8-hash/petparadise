'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import ImageModal from './ImageModal';

export interface Review {
  name: string;
  location: string;
  images: string[];
  stars: number;
  headline: string;
  text: string;
}

function ReviewCard({ review, className = '' }: { review: Review; className?: string }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const total = review.images.length;
  const currentImg = review.images[imgIdx];

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIdx((i) => (i - 1 + total) % total);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIdx((i) => (i + 1) % total);
  };


  return (
    <div className={`bg-gray-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col ${className}`}>
      {/* Image with overlay controls */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 cursor-pointer group" onClick={() => setIsModalOpen(true)}>
        <Image
          key={currentImg}
          src={currentImg}
          alt={review.name}
          fill
          className="object-cover transition-opacity duration-200 group-hover:opacity-90"
          sizes="(max-width: 768px) 85vw, 25vw"
          unoptimized
        />

        {/* Counter (top-left) */}
        <div className="absolute top-3 left-3 z-10 bg-black/70 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
          {imgIdx + 1}/{total}
        </div>

        {/* Navigation arrows (only if more than 1 image) */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-md flex items-center justify-center transition-all active:scale-90"
              aria-label="Anterior imagen"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-md flex items-center justify-center transition-all active:scale-90"
              aria-label="Siguiente imagen"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}

        {/* Quote bubble (bottom-right) */}
        <div className="absolute bottom-3 right-3 z-10 w-12 h-12 bg-[#303854] rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
          </svg>
        </div>
      </div>

      {/* Content section */}
      <div className="p-6 text-center flex flex-col flex-grow">
        <div className="flex justify-center gap-0.5 mb-2">
          {Array.from({ length: review.stars }).map((_, s) => (
            <svg key={s} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-amber-400">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
            </svg>
          ))}
        </div>

        <h3 className="font-black text-[#303854] text-lg md:text-xl mb-3">{review.headline}</h3>

        <p className="text-gray-700 text-sm leading-relaxed flex-grow">{review.text}</p>

        <div className="h-px bg-gray-200 my-4" />

        <p className="italic text-gray-800 text-sm font-medium">
          {review.name} <span className="text-gray-500 not-italic font-normal">— {review.location}</span>
        </p>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        images={review.images}
        initialIdx={imgIdx}
        name={review.name}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default function ProductReviews({ reviews }: { reviews: Review[] }) {
  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden" id="product-reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-[#303854] inline-flex items-center gap-2">
            Nuestros clientes <span className="text-[#303854]">❤</span>
          </h2>
        </div>

        {/* MOBILE: scroll horizontal */}
        <div className="md:hidden -mx-4 px-4 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-4">
            {reviews.map((review, i) => (
              <div key={i} className="snap-center shrink-0 w-[85vw] max-w-sm">
                <ReviewCard review={review} className="h-full" />
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP: 4 columnas, sin slider */}
        <div className="hidden md:grid md:grid-cols-4 gap-6 items-stretch">
          {reviews.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
