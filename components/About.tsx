import React, { useRef, useEffect } from 'react';
import founderImg from '../FOTOS/Bildschirmfoto 2026-01-04 um 14.17.52.png';

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    if (!gsap || !ScrollTrigger || !sectionRef.current) return;

    const ctx = gsap.context(() => {
        gsap.to('.about-image-mask', {
            scrollTrigger: {
                trigger: '.about-image-mask',
                start: "top 85%",
            },
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power4.out"
        });
        
        gsap.from('.about-content', {
            scrollTrigger: {
                trigger: '.about-content',
                start: "top 80%",
            },
            opacity: 0,
            x: 40,
            filter: 'blur(10px)',
            duration: 1.8,
            ease: "power4.out"
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 md:py-48 relative z-10 bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
          <div className="lg:col-span-5">
            <div className="about-image-mask aspect-[3/4] overflow-hidden rounded-2xl opacity-0 translate-y-8">
              <img 
                src={founderImg} 
                alt="Markus Haas" 
                className="w-full h-full object-cover object-top grayscale brightness-75 hover:brightness-90 hover:scale-105 transition-all duration-1000"
              />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-8 about-content">
            <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 font-medium block">Über mich</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight text-white">
              Wandel ist keine Option, sondern eine <span className="font-normal text-neutral-400">Notwendigkeit.</span>
            </h2>
            <div className="space-y-6 text-base md:text-lg text-neutral-400 leading-relaxed max-w-2xl">
              <p>
                Ich bin der Überzeugung, dass Beratung mehr ist als nur Datenanalyse. Es geht darum, den Mut zur Veränderung mit der Präzision der Ausführung zu verbinden.
              </p>
              <p>
                Seit über einem Jahrzehnt unterstütze ich Unternehmen dabei, ihre DNA für die digitale Ära neu zu interpretieren.
              </p>
            </div>
            <div className="pt-8 border-t border-neutral-800 inline-block">
              <p className="text-sm uppercase tracking-[0.2em] font-semibold text-white mb-1">Markus Haas</p>
              <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-medium">Founder & Lead Strategist</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};