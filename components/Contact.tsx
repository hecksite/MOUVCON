import React from 'react';

interface ContactProps {
  onOpenImpressum?: () => void;
  onOpenDatenschutz?: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenImpressum, onOpenDatenschutz }) => {
  return (
    <footer id="contact" className="relative z-30">
      {/* Contact Section - Dark */}
      <div className="bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left - Heading */}
            <div>
              <span className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-widest mb-3 sm:mb-4 block">
                Kontakt
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] text-white mb-6">
                Lassen Sie uns<br />sprechen
              </h2>
              <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-md">
                Bereit für den nächsten Schritt? Ich freue mich darauf, von Ihrem Projekt zu hören.
              </p>
            </div>

            {/* Right - Contact CTA */}
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="mailto:mh@mouvcon.com"
                    className="group inline-flex items-center justify-center gap-3 bg-white hover:bg-neutral-100 text-neutral-900 px-6 sm:px-8 py-4 sm:py-5 rounded-lg transition-all duration-300 hover:shadow-xl"
                  >
                    <iconify-icon icon="ph:envelope-simple" width="22"></iconify-icon>
                    <span className="text-base sm:text-lg font-medium">E-Mail senden</span>
                  </a>
                  
                  <a 
                    href="tel:+491517978313"
                    className="group inline-flex items-center justify-center gap-3 bg-transparent hover:bg-white/10 text-white border-2 border-white px-6 sm:px-8 py-4 sm:py-5 rounded-lg transition-all duration-300"
                  >
                    <iconify-icon icon="ph:phone" width="22"></iconify-icon>
                    <span className="text-base sm:text-lg font-medium">Anrufen</span>
                  </a>
                </div>

                <div className="space-y-4 text-sm text-neutral-400">
                  <div className="flex items-center gap-3">
                    <iconify-icon icon="ph:envelope-simple" width="20" className="text-neutral-500"></iconify-icon>
                    <span>mh@mouvcon.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <iconify-icon icon="ph:phone" width="20" className="text-neutral-500"></iconify-icon>
                    <span>+49 151 7978313</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <iconify-icon icon="ph:map-pin" width="20" className="text-neutral-500"></iconify-icon>
                    <span>Biebelsheim, Deutschland</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Dark (gleiche Farbe wie Kontaktsektion) */}
      <div className="bg-neutral-900 border-t border-neutral-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-16 md:py-24">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
            {/* Brand */}
            <div className="lg:col-span-2">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-3 sm:mb-4 uppercase tracking-tight">
                MOUVCON
              </h3>
              <p className="text-sm sm:text-base text-neutral-400 max-w-md">
                Strategische Exzellenz für eine Welt in Bewegung. Wir gestalten Transformation.
              </p>
            </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs sm:text-sm font-medium text-white uppercase tracking-wider mb-3 sm:mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="#" className="text-sm sm:text-base text-neutral-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#work" className="text-sm sm:text-base text-neutral-400 hover:text-white transition-colors">
                  Referenzen
                </a>
              </li>
              <li>
                <a href="#about" className="text-sm sm:text-base text-neutral-400 hover:text-white transition-colors">
                  Über uns
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm sm:text-base text-neutral-400 hover:text-white transition-colors">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs sm:text-sm font-medium text-white uppercase tracking-wider mb-3 sm:mb-4">
              Social
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 text-sm sm:text-base text-neutral-400 hover:text-white transition-colors"
                >
                  <iconify-icon icon="ph:linkedin-logo" width="20"></iconify-icon>
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 text-sm sm:text-base text-neutral-400 hover:text-white transition-colors"
                >
                  <iconify-icon icon="ph:instagram-logo" width="20"></iconify-icon>
                  <span>Instagram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 sm:pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-neutral-400 text-center md:text-left">
            &copy; {new Date().getFullYear()} Mouvement & Consult. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-4 sm:gap-6">
            <button
              onClick={onOpenImpressum}
              className="text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Impressum
            </button>
            <button
              onClick={onOpenDatenschutz}
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Datenschutz
            </button>
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
};