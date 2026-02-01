import React, { useRef, memo } from 'react';

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

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-32"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-12 md:mb-20">
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-neutral-500 mb-4">Unsere Werte</p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white">
            Was uns antreibt
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {values.map((value) => (
            <div key={value.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
                <img
                  src={value.image}
                  alt={value.title}
                  className="w-full h-[55vh] sm:h-[60vh] md:h-[70vh] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8">
                  <span className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-widest mb-2 block">
                    0{value.id}
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium text-white mb-3 sm:mb-4 leading-tight">
                    {value.title}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                    {value.statement}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

WorkCarousel.displayName = 'WorkCarousel';

