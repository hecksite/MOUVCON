import React, { useEffect, useRef } from 'react';
import { SectionData } from '../types';

interface PhilosophieStackProps {
  sections: SectionData[];
}

export const PhilosophieStack: React.FC<PhilosophieStackProps> = ({ sections }) => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const endTriggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    
    if (!gsap || !ScrollTrigger) return;

    // Background color transition: dark → white (when section starts)
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 50%',
      onEnter: () => {
        gsap.to(sectionRef.current, {
          backgroundColor: '#ffffff',
          duration: 0.8,
          ease: 'power2.inOut'
        });
        gsap.to('.section-header', { color: '#111827', duration: 0.8, ease: 'power2.inOut' });
        gsap.to('.section-subtitle', { color: '#737373', duration: 0.8, ease: 'power2.inOut' });
      },
      onLeaveBack: () => {
        gsap.to(sectionRef.current, {
          backgroundColor: '#0a0a0a',
          duration: 0.8,
          ease: 'power2.inOut'
        });
        gsap.to('.section-header', { color: '#ffffff', duration: 0.8, ease: 'power2.inOut' });
        gsap.to('.section-subtitle', { color: '#737373', duration: 0.8, ease: 'power2.inOut' });
      }
    });

    // Background color transition: white → dark (when leaving section)
    ScrollTrigger.create({
      trigger: endTriggerRef.current,
      start: 'top 50%',
      onEnter: () => {
        gsap.to(sectionRef.current, {
          backgroundColor: '#0a0a0a',
          duration: 0.8,
          ease: 'power2.inOut'
        });
      },
      onLeaveBack: () => {
        gsap.to(sectionRef.current, {
          backgroundColor: '#ffffff',
          duration: 0.8,
          ease: 'power2.inOut'
        });
      }
    });

    // Fade in animation for each card
    cardsRef.current.forEach((card) => {
      if (card) {
        gsap.fromTo(card, 
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st: any) => st.kill());
    };
  }, [sections]);

  const getNumber = (index: number): string => {
    return String(index + 1).padStart(2, '0');
  };

  return (
    <section ref={sectionRef} id="philosophie" className="relative z-10 bg-[#0a0a0a]">
      {/* Section Header */}
      <div className="pt-32 md:pt-48 pb-20 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <span className="section-subtitle text-[11px] uppercase tracking-[0.3em] text-neutral-500 font-medium mb-6 block">
            Meine Philosophie
          </span>
          <h2 className="section-header text-5xl md:text-7xl lg:text-8xl font-display font-semibold text-white">
            Prinzipien des <span className="font-normal text-neutral-400">Erfolgs</span>
          </h2>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pb-32 md:pb-48">
        <div className="space-y-32 md:space-y-48">
          {sections.map((section, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={section.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                  
                  {/* Image */}
                  <div className={`relative aspect-[4/3] lg:aspect-[3/4] overflow-hidden rounded-2xl ${!isEven ? 'lg:col-start-2' : ''}`}>
                    <img
                      src={section.imageUrl}
                      alt={section.subtitle}
                      className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.5] group-hover:brightness-[0.65] group-hover:scale-105 transition-all duration-1000 ease-out"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {/* Number */}
                    <span className="absolute bottom-6 left-6 text-8xl md:text-[10rem] font-bold text-white/10 leading-none font-display">
                      {getNumber(index)}
                    </span>
                  </div>

                  {/* Content */}
                  <div className={`py-8 lg:py-0 ${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <div className="max-w-xl">
                      <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-400 font-medium mb-4 block">
                        Prinzip {getNumber(index)}
                      </span>
                      
                      <h3 className="text-4xl md:text-6xl font-display font-semibold text-neutral-900 mb-6 leading-[1.1]">
                        {section.subtitle}
                      </h3>
                      
                      <p 
                        className="text-lg md:text-xl text-neutral-600 leading-relaxed mb-6"
                        dangerouslySetInnerHTML={{ __html: section.title.replace(/text-white/g, 'text-neutral-900').replace(/font-medium/g, 'font-semibold') }}
                      />
                      
                      <p className="text-base text-neutral-500 leading-relaxed">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Trigger for transition back to dark */}
      <div ref={endTriggerRef} className="h-32 md:h-48" />
    </section>
  );
};
