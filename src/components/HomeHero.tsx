'use client';

import HeroBanner from './HeroBanner';

interface HomeHeroProps {
  onSlideChange?: (index: number) => void;
}

export default function HomeHero({ onSlideChange }: HomeHeroProps = {}) {
  const handleSlideChange = (index: number) => {
    onSlideChange?.(index);
  };

  return (
    <>
      <HeroBanner onSlideChange={handleSlideChange} />
    </>
  );
}
