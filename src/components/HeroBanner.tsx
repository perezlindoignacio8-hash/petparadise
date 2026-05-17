import Image from 'next/image';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden" id="hero-banner">
      {/* Banner Image */}
      <div className="relative w-full" style={{ aspectRatio: '1440/500' }}>
        <Image
          src="/fondopagina.png"
          alt="Pet Paradise Shop - Todo lo que tu mascota necesita"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Bottom wave decoration - curved shape */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 30L48 25C96 20 192 10 288 8.3C384 6.7 480 13.3 576 20C672 26.7 768 33.3 864 35C960 36.7 1056 33.3 1152 28.3C1248 23.3 1344 16.7 1392 13.3L1440 10V60H1392C1344 60 1248 60 1152 60C1056 60 960 60 864 60C768 60 672 60 576 60C480 60 384 60 288 60C192 60 96 60 48 60H0V30Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
