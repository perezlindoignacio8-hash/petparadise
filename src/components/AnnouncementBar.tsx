'use client';

export default function AnnouncementBar() {
  const messages = [
    'ENVÍOS GRATIS',
    '3 CUOTAS SIN INTERÉS',
    'ENVÍOS GRATIS',
    '3 CUOTAS SIN INTERÉS',
    'ENVÍOS GRATIS',
    '3 CUOTAS SIN INTERÉS',
    'ENVÍOS GRATIS',
    '3 CUOTAS SIN INTERÉS',
  ];

  return (
    <div className="announcement-bar bg-red-600 text-white overflow-hidden whitespace-nowrap">
      <div className="announcement-bar__track flex animate-marquee">
        {messages.map((msg, i) => (
          <span
            key={i}
            className="inline-block px-8 py-2 text-xs font-bold tracking-widest uppercase"
          >
            {msg}
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {messages.map((msg, i) => (
          <span
            key={`dup-${i}`}
            className="inline-block px-8 py-2 text-xs font-bold tracking-widest uppercase"
          >
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
