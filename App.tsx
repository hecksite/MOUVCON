import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { WorkCarousel } from './components/WorkCarousel';
import { StudioSection } from './components/StudioSection';
import { Contact } from './components/Contact';
import { Modal } from './components/Modal';
import BeamsBackground from './components/BeamsBackground';

const App: React.FC = () => {
  const [impressumOpen, setImpressumOpen] = useState(false);
  const [datenschutzOpen, setDatenschutzOpen] = useState(false);

  return (
    <div className="antialiased selection:bg-neutral-900 selection:text-white min-h-screen text-neutral-900 font-sans bg-cream">
      <div className="noise-texture"></div>
      <Navigation />

      <main>
        {/* Dark section wrapper for Hero + Values */}
        <div className="relative bg-neutral-900">
            {/* Beams background */}
            <BeamsBackground />

            <Hero />

            <section id="work">
              <WorkCarousel />
            </section>
        </div>
        
        <section id="about">
          <StudioSection />
        </section>
      </main>

      <Contact 
        onOpenImpressum={() => setImpressumOpen(true)}
        onOpenDatenschutz={() => setDatenschutzOpen(true)}
      />

      {/* Modals */}
      <Modal isOpen={impressumOpen} onClose={() => setImpressumOpen(false)} title="Impressum">
        <div className="space-y-4">
          <div>
            <p className="font-medium">MOUVCON</p>
            <p>Markus Haas</p>
            <p>Hauptstr. 4</p>
            <p>55546 Biebelsheim</p>
            <p>GERMANY</p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Kontakt</h3>
            <p>E‑Mail: <a href="mailto:mh@mouvcon.com" className="underline hover:text-neutral-600">mh@mouvcon.com</a></p>
            <p>Mobil: <a href="tel:+491517978313" className="underline hover:text-neutral-600">+49 151 7978313</a></p>
            <p>Website: <a href="https://www.mouvcon.com" className="underline hover:text-neutral-600">www.mouvcon.com</a></p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
            <p>Markus Haas (Anschrift siehe oben)</p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Haftungsausschluss</h3>
            <p className="text-sm text-neutral-500">
              Trotz sorgf\u00e4ltiger inhaltlicher Kontrolle \u00fcbernehmen wir keine Haftung f\u00fcr die Inhalte externer Links. 
              F\u00fcr den Inhalt verlinkter Seiten sind ausschlie\u00dflich deren Betreiber verantwortlich.
            </p>
          </div>
        </div>
      </Modal>

      <Modal isOpen={datenschutzOpen} onClose={() => setDatenschutzOpen(false)} title="Datenschutzerklärung">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">1. Datenschutz auf einen Blick</h3>
            <p className="text-sm text-neutral-500 mb-4">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, 
              wenn Sie diese Website besuchen.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">2. Allgemeine Hinweise und Pflichtinformationen</h3>
            <p className="text-sm text-neutral-500 mb-2"><strong>Verantwortliche Stelle:</strong></p>
            <p className="text-sm text-neutral-500">
              MOUVCON<br />
              Markus Haas<br />
              Hauptstr. 4<br />
              55546 Biebelsheim<br />
              GERMANY
            </p>
            <p className="text-sm text-neutral-500 mt-2">
              E‑Mail: <a href="mailto:mh@mouvcon.com" className="underline hover:text-neutral-900">mh@mouvcon.com</a><br />
              Telefon: <a href="tel:+491517978313" className="underline hover:text-neutral-900">+49 151 7978313</a>
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">3. Datenerfassung auf dieser Website</h3>
            <p className="text-sm text-neutral-500">
              Diese Website erfasst keine personenbezogenen Daten automatisch. Daten werden nur erfasst, 
              wenn Sie uns diese mitteilen (z. B. per Kontaktformular oder E-Mail).
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">4. Ihre Rechte</h3>
            <p className="text-sm text-neutral-500">
              Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung oder Einschränkung der Verarbeitung 
              Ihrer gespeicherten Daten, ein Widerspruchsrecht gegen die Verarbeitung sowie ein Recht auf Datenübertragbarkeit.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;