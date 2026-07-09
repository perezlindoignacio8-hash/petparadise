'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getProducts, demoProducts, demoToProduct } from '@/lib/shopify';

interface Notification {
  id: number;
  name: string;
  product: string;
  minutesAgo: number;
}

const FIRST_NAMES = [
  'María', 'Juan', 'Carlos', 'Ana', 'Pedro', 'Laura', 'Diego', 'Sofia',
  'Roberto', 'Martina', 'Fernando', 'Valentina', 'Andrés', 'Paula', 'Miguel',
  'Julieta', 'Santiago', 'Florencia', 'Ricardo', 'Camila',
];

const LAST_NAMES = [
  'García', 'López', 'González', 'Martínez', 'Rodríguez', 'Pérez', 'Hernández',
  'Díaz', 'Sánchez', 'Torres', 'Flores', 'Castro', 'Morales', 'Ruiz', 'Vargas',
];

const generateRandomName = () => {
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  return `${firstName} ${lastName}`;
};

const generateRandomMinutes = () => {
  return Math.floor(Math.random() * 15) + 1;
};

export default function FloatingNotification() {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [productTitles, setProductTitles] = useState<string[]>([]);

  useEffect(() => {
    getProducts(20)
      .then((products) => {
        const titles = products.map((p) => p.title);
        setProductTitles(titles.length > 0 ? titles : demoProducts.map((p) => p.title));
      })
      .catch((error) => {
        console.error('FloatingNotification: Error loading products:', error);
        setProductTitles(demoProducts.map((p) => p.title));
      });
  }, []);

  useEffect(() => {
    if (productTitles.length === 0) return;

    let idCounter = 0;
    let hideTimeout: ReturnType<typeof setTimeout>;
    let removeTimeout: ReturnType<typeof setTimeout>;
    let nextTimeout: ReturnType<typeof setTimeout>;

    const showNotification = () => {
      idCounter += 1;
      const randomProduct = productTitles[Math.floor(Math.random() * productTitles.length)];
      setNotification({
        id: idCounter,
        name: generateRandomName(),
        product: randomProduct,
        minutesAgo: generateRandomMinutes(),
      });

      // Animar entrada
      setTimeout(() => setIsVisible(true), 50);

      // Iniciar animación de salida después de 5 segundos visible
      hideTimeout = setTimeout(() => {
        setIsVisible(false);
        // Remover notificación después de la animación de salida
        removeTimeout = setTimeout(() => {
          setNotification(null);
          // Mostrar la siguiente notificación después de 2 minutos
          nextTimeout = setTimeout(showNotification, 120000);
        }, 1200);
      }, 5000);
    };

    // Mostrar primera notificación a los 5 segundos
    const firstTimeout = setTimeout(showNotification, 5000);

    return () => {
      clearTimeout(firstTimeout);
      clearTimeout(hideTimeout);
      clearTimeout(removeTimeout);
      clearTimeout(nextTimeout);
    };
  }, [productTitles]);

  if (!notification) return null;

  return (
    <div
      className="pointer-events-none"
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '16px',
        zIndex: 9999,
      }}
    >
      <div
        key={notification.id}
        className="pointer-events-auto"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(-400px) scale(0.9)',
          transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="relative bg-white rounded-xl md:rounded-2xl p-2.5 md:p-4 shadow-2xl border-2 border-slate-100 max-w-[240px] md:max-w-xs overflow-hidden">
          {/* Gradient accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700"></div>

          {/* Live indicator */}
          <div className="absolute top-2 right-2 flex items-center gap-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[8px] md:text-[9px] font-bold text-green-600 uppercase tracking-wider">En vivo</span>
          </div>

          <div className="flex items-start gap-2 md:gap-3 mt-1">
            <div className="shrink-0 w-9 h-9 md:w-12 md:h-12 relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-full p-1.5 ring-2 ring-slate-200">
              <div className="relative w-full h-full">
                <Image
                  src="/logo.png"
                  alt="Pet Paradise"
                  fill
                  loading="lazy"
                  quality={65}
                  sizes="48px"
                  className="object-contain"
                />
              </div>
            </div>
            <div className="flex-1 min-w-0 pr-4">
              <p className="font-black text-[#303854] text-xs md:text-sm leading-tight">
                ✅ <span className="text-[#303854]">{notification.name}</span> acaba de comprar
              </p>
              <p className="text-[11px] md:text-xs text-gray-700 font-semibold mt-1 line-clamp-2">
                {notification.product}
              </p>
              <p className="text-[9px] md:text-[10px] text-gray-400 mt-1.5 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-2.5 h-2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Hace {notification.minutesAgo} {notification.minutesAgo === 1 ? 'minuto' : 'minutos'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
