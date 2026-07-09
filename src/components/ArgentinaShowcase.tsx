import Image from 'next/image';

const features = [
  {
    icon: '🇦🇷',
    title: 'COLORES DE ARGENTINA',
    desc: 'Celeste, blanco y amarillo',
  },
  {
    icon: '⚽',
    title: 'ESPÍRITU MUNDIAL',
    desc: 'Celebrá con tu mascota',
  },
  {
    icon: '🏆',
    title: 'CALIDAD PREMIUM',
    desc: 'Material de la mejor marca',
  },
  {
    icon: '✨',
    title: 'EDICIÓN LIMITADA',
    desc: 'Colección exclusiva 2026',
  },
];

const categories = [
  { src: '/perropartido.png', label: 'PARTIDOS' },
  { src: '/perrojuntada.png', label: 'JUNTADAS' },
  { src: '/perrofamilia.png', label: 'EN FAMILIA' },
];

export default function ArgentinaShowcase() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Features Card */}
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-3 md:p-8 grid grid-cols-4 gap-1 md:gap-6 max-w-5xl mx-auto relative z-30 pointer-events-auto">
        {features.map((f, i) => (
          <div key={i} className="text-center px-0.5 md:px-1 flex flex-col items-center">
            <div className="text-2xl md:text-4xl mb-1.5 md:mb-3">{f.icon}</div>
            <h3 className="font-black text-[#303854] text-[10px] md:text-sm uppercase tracking-tight leading-tight">{f.title}</h3>
            <p className="text-gray-500 text-[9px] md:text-xs mt-1 md:mt-2 leading-tight md:leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Title */}
      <div className="text-center mt-14 md:mt-20 pointer-events-auto">
        <p className="text-[#303854] font-black text-2xl md:text-3xl uppercase tracking-tight">IDEAL PARA</p>
        <div className="inline-flex items-center gap-4 mt-2">
          <span className="text-gray-300 text-3xl select-none" aria-hidden>///</span>
          <h2 className="text-[#7DB8E8] font-black text-4xl md:text-5xl uppercase tracking-tight">CADA MOMENTO MUNDIAL</h2>
          <span className="text-gray-300 text-3xl select-none" aria-hidden>\\\</span>
        </div>
        <p className="text-gray-500 mt-4 text-base md:text-lg">Tu mascota celebrando Argentina en cada partido, junto a vos.</p>
      </div>

      {/* Adventures Grid */}
      <div className="grid grid-cols-3 gap-2 md:gap-6 mt-10 pointer-events-auto">
        {categories.map((a, i) => (
          <div key={i} className="rounded-xl md:rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow group">
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image
                src={a.src}
                alt={a.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 33vw, 33vw"
              />
            </div>
            <div className="bg-[#303854] text-white text-center py-1.5 md:py-3 font-black uppercase tracking-wider md:tracking-widest text-[10px] md:text-sm">
              {a.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
