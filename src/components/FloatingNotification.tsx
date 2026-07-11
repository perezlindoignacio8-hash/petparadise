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
  return Math.floor(Math.random() * 30) + 2;
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

      // Iniciar animación de salida después de 6 segundos visible
      hideTimeout = setTimeout(() => {
        setIsVisible(false);
        // Remover notificación después de la animación de salida
        removeTimeout = setTimeout(() => {
          setNotification(null);
          // Mostrar la siguiente notificación después de 5 minutos
          nextTimeout = setTimeout(showNotification, 300000);
        }, 1200);
      }, 6000);
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
        <div className="relative bg-white rounded-lg md:rounded-xl p-3 md:p-4 shadow-lg border border-gray-200 max-w-xs overflow-hidden">
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-10 h-10 relative bg-gray-100 rounded-full flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Pet Paradise"
                width={32}
                height={32}
                loading="lazy"
                quality={65}
                className="object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm text-gray-800 leading-snug">
                <span className="font-semibold text-[#303854]">{notification.name}</span> compró
              </p>
              <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
                {notification.product}
              </p>
              <p className="text-[11px] text-gray-400 mt-1">
                Hace {notification.minutesAgo} {notification.minutesAgo === 1 ? 'minuto' : 'minutos'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
