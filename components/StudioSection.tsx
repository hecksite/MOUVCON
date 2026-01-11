import React, { useRef, useEffect, memo } from 'react';
import founderImg from '../FOTOS/Bildschirmfoto 2026-01-04 um 14.17.52.png';

const services = [
  { 
    name: 'Beratung für Start-Ups', 
    description: 'Marktvalidierung, Geschäftsmodell & Go‑to‑Market-Unterstützung',
    number: '01'
  },
  { 
    name: 'Innovationsimplementierung', 
    description: 'Von Idee zur operativen Umsetzung neuer Produkte und Services',
    number: '02'
  },
  { 
    name: 'Strategische Neuorientierung', 
    description: 'Neuausrichtung von Strategie, Portfolio und Positionierung',
    number: '03'
  },
  { 
    name: 'Internationalisierung', 
    description: 'Markteintrittsstrategien und Skalierung in Auslandsmärkten',
    number: '04'
  },
  { 
    name: 'Coaching', 
    description: 'Führungskräfte- und Teamcoaching für nachhaltige Transformation',
    number: '05'
  },
];

export const StudioSection: React.FC = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    if (!gsap || !ScrollTrigger || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial visible state for all elements
      gsap.set(['.studio-title', '.studio-text', '.studio-image', '.service-item'], {
        opacity: 1,
        y: 0
      });

      // Reveal animations - only on larger screens
      const isMobile = window.innerWidth < 768;
      
      if (!isMobile) {
        gsap.from('.studio-title', {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.studio-title',
            start: 'top 85%',
          }
        });

        gsap.from('.studio-text', {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.studio-text',
            start: 'top 85%',
          }
        });

        gsap.from('.studio-image', {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.studio-image',
            start: 'top 85%',
          }
        });

        gsap.from('.service-item', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.services-list',
            start: 'top 85%',
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-cream text-neutral-900 rounded-t-[1.5rem] sm:rounded-t-[2rem] md:rounded-t-[3rem] -mt-6 sm:-mt-8 md:-mt-12 z-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-20 md:py-32 lg:py-40">
        {/* Header */}
        <div className="mb-16 sm:mb-20 md:mb-32">
          <span className="text-[10px] sm:text-xs text-neutral-500 uppercase tracking-widest mb-3 sm:mb-4 block">
            Über mich
          </span>
          <h2 className="studio-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.1] max-w-4xl">
            Wandel ist keine Option,
            <br />
            <span className="text-neutral-400">sondern Notwendigkeit.</span>
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 mb-20 sm:mb-24 md:mb-32">
          {/* Left - Image */}
          <div className="studio-image">
            <div className="aspect-[4/5] overflow-hidden rounded-xl sm:rounded-2xl">
              <img 
                src={founderImg}
                alt="Markus Haas"
                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="mt-4 sm:mt-6">
              <p className="text-base sm:text-lg font-medium text-neutral-900">Markus Haas</p>
              <p className="text-xs sm:text-sm text-neutral-500">Founder & Lead Strategist</p>
            </div>
          </div>

          {/* Right - Text */}
          <div className="flex flex-col justify-center">
            <p className="studio-text text-lg sm:text-xl md:text-2xl text-neutral-700 leading-relaxed mb-6 sm:mb-8">
              Ich bin der Überzeugung, dass Beratung mehr ist als nur Datenanalyse. Es geht darum, den Mut zur Veränderung mit der Präzision der Ausführung zu verbinden.
            </p>
            <p className="studio-text text-base sm:text-lg text-neutral-500 leading-relaxed">
              Seit über einem Jahrzehnt unterstütze ich Unternehmen dabei, ihre DNA für die digitale Ära neu zu interpretieren. Mein Ansatz verbindet strategisches Denken mit praktischer Umsetzung.
            </p>
          </div>
        </div>

        {/* Services - Elegant Grid Cards */}
        <div>
          <div className="mb-12 sm:mb-16">
            <span className="text-[10px] sm:text-xs text-neutral-500 uppercase tracking-widest mb-3 sm:mb-4 block">
              Leistungen
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.1] text-neutral-900">
              Ihr Erfolg ist mein Antrieb
            </h2>
          </div>
          
          <div className="services-list grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className="service-item group relative bg-white border border-neutral-200 hover:border-neutral-900 rounded-lg p-6 sm:p-8 transition-all duration-500 hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-medium text-neutral-400 tracking-wider">
                    {service.number}
                  </span>
                  <div className="w-8 h-px bg-neutral-200 group-hover:w-12 group-hover:bg-neutral-900 transition-all duration-500"></div>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-3 group-hover:text-neutral-700 transition-colors duration-300">
                  {service.name}
                </h3>
                
                <p className="text-sm sm:text-base text-neutral-500 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

StudioSection.displayName = 'StudioSection';
