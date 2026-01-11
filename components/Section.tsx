import React, { useRef, useEffect } from 'react';
import { SectionData } from '../types';

interface SectionProps {
  data: SectionData;
  index: number;
}

export const Section: React.FC<SectionProps> = ({ data, index }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    
    if (!gsap || !ScrollTrigger || !sectionRef.current) return;

    // Check if mobile for optimized animations
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // Subtitle fade-in from bottom
      const subtitle = sectionRef.current?.querySelector('.section-subtitle');
      if (subtitle) {
        gsap.from(subtitle, {
          scrollTrigger: {
            trigger: subtitle,
            start: isMobile ? "top 90%" : "top 85%",
          },
          opacity: 0,
          y: isMobile ? 20 : 30,
          duration: isMobile ? 0.8 : 1.2,
          ease: "power3.out"
        });
      }

      // Title reveal with scale and blur
      const title = sectionRef.current?.querySelector('.section-title');
      if (title) {
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: isMobile ? "top 88%" : "top 80%",
          },
          opacity: 0,
          y: isMobile ? 30 : 50,
          scale: isMobile ? 0.97 : 0.95,
          filter: isMobile ? 'blur(5px)' : 'blur(10px)',
          duration: isMobile ? 1.0 : 1.5,
          ease: "power4.out",
          delay: 0.15
        });
      }

      // Description fade with slide
      const description = sectionRef.current?.querySelector('.section-description');
      if (description) {
        gsap.from(description, {
          scrollTrigger: {
            trigger: description,
            start: isMobile ? "top 90%" : "top 85%",
          },
          opacity: 0,
          y: isMobile ? 15 : 20,
          duration: isMobile ? 0.8 : 1.2,
          ease: "power3.out",
          delay: 0.3
        });
      }

      // Image container scale and mask reveal
      const imageContainer = sectionRef.current?.querySelector('.value-image-container');
      if (imageContainer) {
        gsap.from(imageContainer, {
          scrollTrigger: {
            trigger: imageContainer,
            start: isMobile ? "top 88%" : "top 85%",
          },
          opacity: 0,
          scale: isMobile ? 0.95 : 0.9,
          filter: isMobile ? 'blur(10px)' : 'blur(20px)',
          duration: isMobile ? 1.2 : 1.8,
          ease: "power4.out"
        });
      }

      // Parallax Image with enhanced movement (reduced on mobile)
      const img = sectionRef.current?.querySelector('.value-image');
      if (img) {
        gsap.to(img, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: isMobile ? 1 : 1.5
          },
          yPercent: isMobile ? -15 : -30,
          ease: "none"
        });
      }

      // Rotate and scale on scroll (reduced on mobile for performance)
      if (!isMobile) {
        gsap.to(imageContainer, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 2
          },
          rotation: index % 2 === 0 ? 2 : -2,
          ease: "none"
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [index]);

  const isEven = index % 2 !== 0; // Alternating layout
  
  // Darker shade of brand-muted for sections with light background (Innovativ, Nachhaltig, Respektvoll)
  // brand-muted is #b8aea4, darker version is #8a7f75
  const textColorClass = (data.id === 'innovative' || data.id === 'sustainable' || data.id === 'respectful') 
    ? 'text-[#8a7f75]' 
    : 'text-brand-muted';

  return (
    <div ref={sectionRef} className="value-section grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 lg:gap-16 xl:gap-20 items-center mb-16 sm:mb-20 md:mb-28 lg:mb-40 last:mb-0">
      <div className={`value-image-container aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-sm relative ${isEven ? 'lg:order-2' : ''}`}>
        <img 
          src={data.imageUrl} 
          alt={data.title} 
          className="value-image w-full h-full object-cover grayscale brightness-[0.6] scale-125"
        />
        {/* Gradient overlay for depth */}
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