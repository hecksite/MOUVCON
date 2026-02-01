import React, { useRef } from 'react';
import { SectionData } from '../types';

interface SectionProps {
  data: SectionData;
  index: number;
}

export const Section: React.FC<SectionProps> = ({ data, index }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const isEven = index % 2 !== 0;
  
  const textColorClass = (data.id === 'innovative' || data.id === 'sustainable' || data.id === 'respectful') 
    ? 'text-[#8a7f75]' 
    : 'text-brand-muted';

  return (
    <div ref={sectionRef} className="value-section grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 lg:gap-16 xl:gap-20 items-center mb-16 sm:mb-20 md:mb-28 lg:mb-40 last:mb-0">
      <div className={`value-image-container aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-sm relative ${isEven ? 'lg:order-2' : ''}`}>
        <img 
          src={data.imageUrl} 
          alt={data.title} 
          className="value-image w-full h-full object-cover grayscale brightness-[0.6]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40 pointer-events-none"></div>
      </div>
      <div className={`${isEven ? 'lg:order-1 lg:pr-16' : 'lg:pl-16'} mb-10 lg:mb-0`}>
        <h3 className={`section-subtitle text-[10px] uppercase tracking-[0.6em] ${textColorClass} mb-6 md:mb-8`}>
          {data.subtitle}
        </h3>
        <p className="section-title text-3xl md:text-5xl font-sans font-light leading-[1.1] mb-8 md:mb-10" dangerouslySetInnerHTML={{ __html: data.title }} />
        <p className={`section-description ${textColorClass} text-lg leading-relaxed max-w-md`}>
          {data.description}
        </p>
      </div>
    </div>
  );
};