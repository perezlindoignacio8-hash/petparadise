'use client';

import { useState, useEffect, useRef } from 'react';

const STORAGE_KEY = 'pp_offer_expires_at';

function getOrCreateExpiry(): number {
  if (typeof window === 'undefined') return Date.now();
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const expiry = parseInt(stored, 10);
    // Si ya expiró, creá uno nuevo
    if (expiry > Date.now()) return expiry;
  }
  // Random entre 4 y 12 horas desde ahora
  const hours = Math.floor(Math.random() * 8) + 4;
  const expiry = Date.now() + hours * 60 * 60 * 1000;
  localStorage.setItem(STORAGE_KEY, String(expiry));
  return expiry;
}

function getRemaining(expiry: number) {
  const diff = Math.max(0, expiry - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, '0');

export default function CountdownTimer() {
  const expiryRef = useRef<number>(0);
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    expiryRef.current = getOrCreateExpiry();
    setTime(getRemaining(expiryRef.current));
    setMounted(true);

    const interval = setInterval(() => {
      const remaining = getRemaining(expiryRef.current);
      // Si expiró, generá uno nuevo
      if (remaining.hours === 0 && remaining.minutes === 0 && remaining.seconds === 0) {
        const hours = Math.floor(Math.random() * 8) + 4;
        expiryRef.current = Date.now() + hours * 60 * 60 * 1000;
        localStorage.setItem(STORAGE_KEY, String(expiryRef.current));
      }
      setTime(getRemaining(expiryRef.current));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Evita hydration mismatch
  if (!mounted) return null;

  return (
    <div>
      <div className="bg-gradient-to-r from-[#7DB8E8] to-sky-400 border-2 border-[#7DB8E8] rounded-2xl px-6 py-6 mt-2 shadow-lg overflow-hidden relative" id="countdown-timer">
        {/* Shimmer background */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 animate-countdown-shimmer"></div>

        <div className="relative">
          <p className="text-white text-xs md:text-sm font-black text-center uppercase tracking-widest mb-5 flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 animate-bounce">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
            </svg>
            ⏰ Esta oferta vence en ⏰
          </p>

          <div className="flex items-center justify-center gap-2 md:gap-4">
            {/* Hours */}
            <div className="flex flex-col items-center">
              <div className="bg-white/95 rounded-lg px-3 md:px-4 py-2 md:py-3 min-w-[56px] md:min-w-[72px] text-center shadow-md">
                <span className="text-[#303854] text-4xl md:text-5xl font-black tabular-nums">{pad(time.hours)}</span>
              </div>
              <span className="text-white text-xs md:text-sm font-black uppercase tracking-widest mt-2">Horas</span>
            </div>

            <span className="text-white text-3xl md:text-4xl font-black mb-2 animate-pulse">:</span>

            {/* Minutes */}
            <div className="flex flex-col items-center">
              <div className="bg-white/95 rounded-lg px-3 md:px-4 py-2 md:py-3 min-w-[56px] md:min-w-[72px] text-center shadow-md">
                <span className="text-[#303854] text-4xl md:text-5xl font-black tabular-nums">{pad(time.minutes)}</span>
              </div>
              <span className="text-white text-xs md:text-sm font-black uppercase tracking-widest mt-2">Minutos</span>
            </div>

            <span className="text-white text-3xl md:text-4xl font-black mb-2 animate-pulse">:</span>

            {/* Seconds */}
            <div className="flex flex-col items-center">
              <div className="bg-white/95 rounded-lg px-3 md:px-4 py-2 md:py-3 min-w-[56px] md:min-w-[72px] text-center shadow-md">
                <span className="text-[#303854] text-4xl md:text-5xl font-black tabular-nums">{pad(time.seconds)}</span>
              </div>
              <span className="text-white text-xs md:text-sm font-black uppercase tracking-widest mt-2">Segundos</span>
            </div>
          </div>

          <p className="text-white/90 text-xs md:text-sm text-center mt-5 font-bold">
            El precio vuelve a su valor original cuando termine el contador
          </p>
        </div>
      </div>

      <div className="mt-5">
        {/* Stock Alert */}
        <div className="text-center flex items-center justify-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#7DB8E8] animate-pulse shadow-lg" style={{boxShadow: '0 0 10px rgba(125, 184, 232, 0.6)'}}></span>
          <span className="text-[#303854] text-sm font-black">Quedan pocas unidades — <span className="text-[#7DB8E8]">pedí ahora</span></span>
        </div>
      </div>
    </div>
  );
}
