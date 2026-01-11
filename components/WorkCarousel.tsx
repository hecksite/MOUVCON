import React, { useEffect, useRef, memo } from 'react';

interface ValueCard {
  id: number;
  title: string;
  statement: string;
  image: string;
}

const values: ValueCard[] = [
  {
    id: 1,
    title: 'Visionär',
    statement: 'Wir denken über das Heute hinaus und gestalten die Zukunft mit Weitblick.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=800&fit=crop&auto=format&q=75'
  },
  {
    id: 2,
    title: 'Innovativ',
    statement: 'Neue Wege entstehen dort, wo wir den Mut haben, ausgetretene Pfade zu verlassen.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=800&fit=crop&auto=format&q=75'
  },
  {
    id: 3,
    title: 'Nachhaltig',
    statement: 'Echter Erfolg misst sich an dem, was wir für kommende Generationen hinterlassen.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=800&fit=crop&auto=format&q=75'
  },
  {
    id: 4,
    title: 'Respektvoll',
    statement: 'Partnerschaftlich auf Augenhöhe – denn nur gemeinsam erreichen wir Großes.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=800&fit=crop&auto=format&q=75'
  }
];

export const WorkCarousel: React.FC = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    
    if (!gsap || !ScrollTrigger || !sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      // Calculate scroll distance
      const track = trackRef.current!;
      const scrollDistance = track.scrollWidth - window.innerWidth + 100;

      // Horizontal scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      tl.to(track, {
        x: -scrollDistance,
        ease: 'none'
      });

      // Progress bar animation
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${scrollDistance}`,
            scrub: 1
          }
        });
      }

      // Reveal animations for header
      gsap.from('.work-header', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* Header */}
      <div className="work-header absolute top-6 sm:top-8 md:top-12 left-4 sm:left-6 md:left-12 lg:left-20 z-10 pr-4">
        <span className="text-[10px] sm:text-xs text-neutral-500 uppercase tracking-widest mb-2 block">
          Unsere Werte
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight">
          Wofür wir stehen
        </h2>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-6 md:left-12 lg:left-20 right-4 sm:right-6 md:right-12 lg:right-20 z-10">
        <div className="h-px bg-neutral-700 w-full">
          <div ref={progressRef} className="h-full bg-white origin-left" style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>

      {/* Carousel */}
      <div className="h-screen flex items-center">
        <div ref={trackRef} className="carousel-track pl-4 sm:pl-6 md:pl-12 lg:pl-20">
          {values.map((value) => (
            <div key={value.id} className="carousel-item group cursor-pointer">
              {/* Image container with overlay text */}
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
                <img
                  src={value.image}
                  alt={value.title}
                  className="w-full h-[55vh] sm:h-[60vh] md:h-[70vh] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Text content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8">
                  <span className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-widest mb-2 block">
                    0{value.id}
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-3 sm:mb-4 group-hover:text-neutral-200 transition-colors leading-tight">
                    {value.title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed max-w-md">
                    {value.statement}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Spacer at end */}
          <div className="w-10 sm:w-20 flex-shrink-0" />
        </div>
      </div>
    </section>
  );
});

WorkCarousel.displayName = 'WorkCarousel';
