import Link from 'next/link';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-red-700 via-red-600 to-red-500" id="hero-banner">
      {/* Radial burst background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, transparent 0%, transparent 30%, rgba(0,0,0,0.1) 30%, transparent 31%, transparent 40%, rgba(0,0,0,0.08) 40%, transparent 41%, transparent 50%, rgba(0,0,0,0.06) 50%, transparent 51%)',
            backgroundSize: '100% 100%',
          }}
        />
      </div>

      {/* Paw prints decoration */}
      <div className="absolute top-8 right-[15%] opacity-10 text-white text-8xl">🐾</div>
      <div className="absolute bottom-12 left-[10%] opacity-10 text-white text-6xl rotate-[-20deg]">🐾</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="text-white space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none">
                Pet Paradise
              </h1>
              <p className="text-2xl md:text-3xl font-bold text-red-200 mt-1 uppercase">
                Shop
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg md:text-xl font-bold italic">
                TODO LO QUE TU MASCOTA NECESITA
              </h2>
              <p className="text-sm md:text-base text-red-100 italic max-w-md leading-relaxed">
                Encontrá productos de calidad y ofertas increíbles para hacer
                la vida de tu mejor amigo mas feliz!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center gap-2 bg-white text-red-600 px-8 py-3 rounded-full font-bold text-sm hover:bg-red-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                id="hero-cta-button"
              >
                Ver Tienda →
              </Link>
            </div>

            <div className="inline-flex items-center gap-2 bg-red-800/50 backdrop-blur-sm rounded-full px-5 py-2.5 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              <span className="font-medium">342-477-0030</span>
            </div>
          </div>

          {/* Hero Image area - decorative pet silhouettes */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="relative w-full h-[400px] flex items-end justify-center">
              {/* Cat silhouette */}
              <div className="text-white/90 text-[200px] leading-none select-none transform -translate-x-4">
                🐱
              </div>
              {/* Dog silhouette */}
              <div className="text-white/90 text-[200px] leading-none select-none transform translate-x-4 -translate-y-2">
                🐕
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 30L48 25C96 20 192 10 288 8.3C384 6.7 480 13.3 576 20C672 26.7 768 33.3 864 35C960 36.7 1056 33.3 1152 28.3C1248 23.3 1344 16.7 1392 13.3L1440 10V60H1392C1344 60 1248 60 1152 60C1056 60 960 60 864 60C768 60 672 60 576 60C480 60 384 60 288 60C192 60 96 60 48 60H0V30Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
