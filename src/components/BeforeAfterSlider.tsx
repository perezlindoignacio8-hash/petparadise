'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  intervalMs?: number;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Antes',
  afterLabel = 'Después',
  intervalMs = 6000,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(75);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => (prev > 50 ? 25 : 75));
    }, intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs]);

  return (
    <div className="relative w-full aspect-[3/2] rounded-3xl overflow-hidden shadow-2xl select-none">
      {/* Before image (base layer) */}
      <Image
        src={beforeSrc}
        alt={beforeLabel}
        fill
        loading="lazy"
        quality={65}
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* After image clipped from the right */}
      <div
        className="absolute inset-0 transition-[clip-path] duration-[2500ms] ease-in-out"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={afterSrc}
          alt={afterLabel}
          fill
          loading="lazy"
          quality={65}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-[3px] bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-[left] duration-[2500ms] ease-in-out"
        style={{ left: `calc(${position}% - 1.5px)` }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center ring-4 ring-white/30">
          <svg className="w-6 h-6 text-slate-800" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 4.5 12l3.75 5.25M15.75 6.75 19.5 12l-3.75 5.25" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/70 text-white text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-sm">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 bg-slate-800 text-white text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
        {afterLabel}
      </div>
    </div>
  );
}
