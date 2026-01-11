import React, { useRef, useEffect } from 'react';

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    if (!gsap || !ScrollTrigger || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial visibility
      gsap.set('.contact-title, .contact-option', { opacity: 1 });

      gsap.from('.contact-title', {
        scrollTrigger: {
          trigger: '.contact-title',
          start: "top 80%",
        },
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power4.out"
      });

      gsap.from('.contact-option', {
        scrollTrigger: {
          trigger: '.contact-options',
          start: "top 75%",
        },
        opacity: 0,
        y: 30,
        duration: 1.0,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact-section" className="py-32 md:py-48 relative z-10 bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 font-medium mb-6 block">Kontakt</span>
          <h2 className="contact-title text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight text-white mb-6">
            Lassen Sie uns über Ihre <span className="font-normal text-neutral-400">Ziele</span> sprechen.
          </h2>
          <p className="text-base md:text-lg text-neutral-400 leading-relaxed mb-16">
            Ich freue mich auf ein persönliches Gespräch über Ihre Herausforderungen und Möglichkeiten.
          </p>

          <div className="contact-options grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Email Option */}
            <a 
              href="mailto:mh@mouvcon.com"
              className="contact-option group relative bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 hover:border-neutral-700 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-medium mb-2">E-Mail</h3>
                  <p className="text-lg font-semibold text-white">mh@mouvcon.com</p>
                </div>
              </div>
            </a>

            {/* Phone Option */}
            <a 
              href="tel:+491517978313"
              className="contact-option group relative bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 hover:border-neutral-700 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-medium mb-2">Telefon</h3>
                  <p className="text-lg font-semibold text-white">+49 151 7978313</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
