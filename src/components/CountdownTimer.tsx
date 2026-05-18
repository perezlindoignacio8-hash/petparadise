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
    <div className="bg-red-600 rounded-2xl px-6 py-5 mt-2" id="countdown-timer">
      <p className="text-white text-xs font-bold text-center uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 animate-bounce">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
        </svg>
        ¡Esta oferta vence en!
      </p>

      <div className="flex items-center justify-center gap-3">
        {/* Hours */}
        <div className="flex flex-col items-center">
          <div className="bg-white/20 backdrop-blur rounded-xl px-4 py-3 min-w-[64px] text-center">
            <span className="text-white text-3xl font-black tabular-nums">{pad(time.hours)}</span>
          </div>
          <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest mt-1.5">Horas</span>
        </div>

        <span className="text-white text-3xl font-black mb-4">:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <div className="bg-white/20 backdrop-blur rounded-xl px-4 py-3 min-w-[64px] text-center">
            <span className="text-white text-3xl font-black tabular-nums">{pad(time.minutes)}</span>
          </div>
          <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest mt-1.5">Minutos</span>
        </div>

        <span className="text-white text-3xl font-black mb-4">:</span>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <div className="bg-white/20 backdrop-blur rounded-xl px-4 py-3 min-w-[64px] text-center">
            <span className="text-white text-3xl font-black tabular-nums">{pad(time.seconds)}</span>
          </div>
          <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest mt-1.5">Segundos</span>
        </div>
      </div>

      <p className="text-white/80 text-xs text-center mt-4">
        🔥 El precio vuelve a su valor original cuando termine el contador
      </p>
    </div>
  );
}
