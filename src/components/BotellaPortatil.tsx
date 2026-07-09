import Image from 'next/image';

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-2.429 5.857-7.5 8.443-7.5 13.5a7.5 7.5 0 1 0 15 0c0-5.057-5.071-7.643-7.5-13.5Z" />
      </svg>
    ),
    title: 'HIDRATACIÓN FÁCIL Y RÁPIDA',
    desc: 'Para paseos sin preocupaciones',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
    title: 'MATERIALES SEGUROS',
    desc: 'Resistente y libre de BPA',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 8 2 22M17.5 15H9" />
      </svg>
    ),
    title: 'LIVIANA Y PORTÁTIL',
    desc: 'Llevála a todos lados',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
      </svg>
    ),
    title: 'DISEÑO ANTIDERRAME',
    desc: 'Agua limpia siempre, sin fugas',
  },
];

const adventures = [
  { src: '/perropaseo.png', label: 'PASEOS' },
  { src: '/perroviaje.png', label: 'VIAJES' },
  { src: '/perroaventura.png', label: 'AVENTURAS' },
];

export default function BotellaPortatil() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Section title */}
      <div className="text-center mb-8 md:mb-12 max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-[#303854] leading-tight">
          ¿Por qué comprar la botella para sus paseos?
        </h2>
      </div>

      {/* Features Card */}
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-3 md:p-8 grid grid-cols-4 gap-1 md:gap-6 max-w-5xl mx-auto relative z-30 pointer-events-auto">
        {features.map((f, i) => (
          <div key={i} className="text-center px-0.5 md:px-1 flex flex-col items-center">
            <div className="text-teal-600 mb-1.5 md:mb-3 [&_svg]:w-6 [&_svg]:h-6 md:[&_svg]:w-9 md:[&_svg]:h-9">{f.icon}</div>
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
          <h2 className="text-[#303854] font-black text-4xl md:text-5xl uppercase tracking-tight">CADA AVENTURA</h2>
          <span className="text-gray-300 text-3xl select-none" aria-hidden>\\\</span>
        </div>
        <p className="text-gray-500 mt-4 text-base md:text-lg">Tu compañero siempre hidratado, vos tranquilo.</p>
      </div>

      {/* Adventures Grid */}
      <div className="grid grid-cols-3 gap-2 md:gap-6 mt-10 pointer-events-auto">
        {adventures.map((a, i) => (
          <div key={i} className="rounded-xl md:rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow group">
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image
                src={a.src}
                alt={a.label}
                fill
                loading="lazy"
                quality={65}
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 400px"
              />
            </div>
            <div className="bg-teal-500 text-white text-center py-1.5 md:py-3 font-black uppercase tracking-wider md:tracking-widest text-[10px] md:text-sm">
              {a.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
