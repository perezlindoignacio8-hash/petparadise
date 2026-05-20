'use client';

import { useState } from 'react';
import HeroBanner from './HeroBanner';
import BotellaPortatil from './BotellaPortatil';

interface HomeHeroProps {
  onSlideChange?: (index: number) => void;
}

export default function HomeHero({ onSlideChange }: HomeHeroProps = {}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    onSlideChange?.(index);
  };

  return (
    <>
      <HeroBanner onSlideChange={handleSlideChange} />
      <div
        className={`grid transition-all duration-500 ease-in-out relative z-30 pointer-events-none ${
          currentSlide === 0
            ? 'grid-rows-[1fr] opacity-100 -mt-16 md:-mt-24'
            : 'grid-rows-[0fr] opacity-0 mt-0'
        }`}
      >
        <div className="overflow-hidden">
          <BotellaPortatil />
        </div>
      </div>
    </>
  );
}
