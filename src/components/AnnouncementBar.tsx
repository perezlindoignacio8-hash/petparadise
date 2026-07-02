'use client';

export default function AnnouncementBar() {
  const messages = [
    'ENVÍOS GRATIS A TODO EL PAÍS',
    '3 CUOTAS SIN INTERÉS',
    '🔥 DESCUENTOS POR TIEMPO LIMITADO 🔥',
    'ENVÍOS GRATIS A TODO EL PAÍS',
    '3 CUOTAS SIN INTERÉS',
    '🔥 DESCUENTOS POR TIEMPO LIMITADO 🔥',
    'ENVÍOS GRATIS A TODO EL PAÍS',
    '3 CUOTAS SIN INTERÉS',
    '🔥 DESCUENTOS POR TIEMPO LIMITADO 🔥',
  ];

  return (
    <div className="announcement-bar bg-slate-800 text-white overflow-hidden whitespace-nowrap">
      <div className="announcement-bar__track flex animate-marquee w-max">
        {messages.map((msg, i) => (
          <span
            key={i}
            className="shrink-0 px-4 sm:px-8 py-2 text-xs font-bold tracking-widest uppercase"
          >
            {msg}
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {messages.map((msg, i) => (
          <span
            key={`dup-${i}`}
            className="shrink-0 px-4 sm:px-8 py-2 text-xs font-bold tracking-widest uppercase"
          >
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
