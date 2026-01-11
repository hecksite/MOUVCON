import React, { useRef, useEffect } from 'react';

interface Project {
  number: string;
  title: string;
  location: string;
  description: string;
  imageUrl: string;
}

const projects: Project[] = [
  {
    number: '01',
    title: 'DIGITALE TRANSFORMATION',
    location: 'Mittelstand, Deutschland',
    description: 'Umfassende Digitalisierungsstrategie für einen traditionsreichen Maschinenbauer. Von der Prozessanalyse bis zur Implementierung.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
  },
  {
    number: '02',
    title: 'CHANGE MANAGEMENT',
    location: 'Konzern, Frankfurt',
    description: 'Begleitung einer Fusion zweier Unternehmen. Kulturelle Integration und Neuausrichtung der Führungsebene.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
  },
  {
    number: '03',
    title: 'STRATEGIEENTWICKLUNG',
    location: 'Start-up, Berlin',
    description: 'Entwicklung einer Wachstumsstrategie für ein Tech-Start-up. Marktanalyse, Positionierung und Investorenpitch.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
  },
];

export const CardStack: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    if (!gsap || !ScrollTrigger || !sectionRef.current) return;

    const cards = gsap.utils.toArray('.card-item');

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.stack-header', {
        scrollTrigger: {
          trigger: '.stack-header',
          start: 'top 85%',
        },
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power4.out',
      });

      // Card stack animation - scale down previous card as next comes in
      cards.forEach((card: any, i: number) => {
        const nextCard = cards[i + 1];
        if (nextCard) {
          gsap.to(card.querySelector('.card-inner'), {
            scale: 0.9,
            opacity: 0.4,
            ease: 'none',
            scrollTrigger: {
              trigger: nextCard,
              start: 'top bottom',
              end: 'top 10vh',
              scrub: true,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="stack-section py-24 md:py-32 bg-[#1a1a1a] text-white relative">
      {/* Header */}
      <div className="stack-header text-center mb-16 md:mb-24 px-6">
        <div className="text-[10px] uppercase tracking-[0.5em] mb-4 text-brand-muted">Ausgewählte Projekte</div>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans font-medium">
          REFERENZEN
        </h2>
      </div>

      {/* Stack Container */}
      <div className="stack-container max-w-[1400px] mx-auto px-6 md:px-12 relative pb-16">
        {projects.map((project, index) => (
          <div key={index} className="card-item sticky top-[10vh] h-[80vh] w-full flex items-center justify-center mb-[5vh]">
            <div className="card-inner w-full h-full bg-[#1a1a1a] border border-white/10 relative overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-2xl">
              {/* Content */}
              <div className="card-content p-8 md:p-12 lg:p-16 flex flex-col justify-between bg-[#1a1a1a] z-10 order-2 lg:order-1">
                <div>
                  <div className="text-5xl md:text-6xl font-sans font-light mb-4 text-white/20">
                    {project.number}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-medium mb-4">
                    {project.title}
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-brand-muted">
                    {project.location}
                  </p>
                </div>
                <div className="text-gray-400 font-light text-base md:text-lg leading-relaxed my-8">
                  {project.description}
                </div>
                <button className="text-left uppercase tracking-[0.3em] text-xs border-b border-white/30 pb-2 w-max hover:text-white hover:border-white transition-colors">
                  Mehr erfahren
                </button>
              </div>

              {/* Image */}
              <div className="card-img-wrap relative w-full h-[40vh] lg:h-full overflow-hidden order-1 lg:order-2">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="card-img w-full h-full object-cover grayscale brightness-[0.7] hover:scale-110 transition-transform duration-[1.5s]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
