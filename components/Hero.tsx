import React, { useEffect, useRef, memo } from 'react';

export const Hero: React.FC = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const gsap = (window as any).gsap;
    if (!gsap) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.inOut" }});

      // Ensure everything is visible at the start
      tl.set(['#hero-tag', '.letter', '#hero-subtitle', '.char-wrapper', '#spacer', '#spacer2', '#part-ampersand'], {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)'
      });

      // After a pause, collapse the extra parts so the word becomes 'Mouvcon'
      tl.to(['#part-ement', '#part-sulting', '#part-ampersand', '#spacer', '#spacer2'], {
        opacity: 0,
        width: 0,
        filter: isMobile ? 'blur(4px)' : 'blur(8px)',
        duration: isMobile ? 2.5 : 3.0,
        ease: 'expo.inOut',
        delay: isMobile ? 1.0 : 1.5
      });

      // Small accent on letters so they "gather" visually
      tl.to('.letter', {
        scale: isMobile ? 1.01 : 1.02,
        y: isMobile ? -4 : -6,
        duration: isMobile ? 1.8 : 2.25,
        stagger: isMobile ? 0.06 : 0.08,
        ease: 'power2.out'
      }, isMobile ? '-=2.0' : '-=2.5');

      // Animate subtitle
      tl.to('#hero-subtitle', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: isMobile ? 1.5 : 2.0
      }, isMobile ? '-=1.0' : '-=1.5');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center py-16 sm:py-20 md:py-20 px-4 md:px-8" style={{ isolation: 'isolate' }}>
      {/* Text content layer */}
      <div className="max-w-full mx-auto w-full" style={{ position: 'relative', zIndex: 10 }}>
        <div className="flex flex-col items-center text-center">
          
          <div className="mb-6 sm:mb-8 md:mb-6 lg:mb-10 overflow-hidden">
            <span className="inline-block text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] uppercase tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.4em] text-neutral-500 font-medium" id="hero-tag">
              Architects of Change
            </span>
          </div>

          <div className="text-[2.2rem] leading-[0.95] sm:text-[2.5rem] md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-semibold uppercase tracking-[0.01em] sm:tracking-[0.02em] md:tracking-[0.04em] flex flex-nowrap items-center justify-center w-full max-w-[100vw] px-2 text-white whitespace-nowrap overflow-hidden" id="hero-title">
            <div className="flex items-center flex-shrink-0">
              <span className="letter">M</span>
              <span className="letter">O</span>
              <span className="letter">U</span>
              <span className="letter">V</span>
              <span className="char-wrapper text-neutral-500 font-normal" id="part-ement">EMENT</span>
            </div>
            <div id="spacer" className="w-1 sm:w-2 md:w-6 flex-shrink-0"></div>
            <span className="char-wrapper text-neutral-500 font-normal text-[0.6em] flex-shrink-0" id="part-ampersand">&</span>
            <div id="spacer2" className="w-1 sm:w-2 md:w-6 flex-shrink-0"></div>
            <div className="flex items-center flex-shrink-0">
              <span className="letter">C</span>
              <span className="letter">O</span>
              <span className="letter">N</span>
              <span className="char-wrapper text-neutral-500 font-normal" id="part-sulting">SULT</span>
            </div>
          </div>

          <div className="mt-8 sm:mt-10 md:mt-8 lg:mt-12 max-w-sm sm:max-w-xl md:max-w-2xl px-4" id="hero-subtitle">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-400 font-light leading-relaxed tracking-wide">
              Strategic excellence for a world in <span className="text-white font-normal">motion</span>.
            </p>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator - hidden on mobile */}
      <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-50">
        <span className="text-xs text-neutral-500 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-neutral-500 to-transparent" />
      </div>
    </header>
  );
});

Hero.displayName = 'Hero';