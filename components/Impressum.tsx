import React from 'react';

export const Impressum: React.FC = () => {
  return (
    <section id="impressum" className="py-24 bg-white text-black min-h-screen">
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <h1 className="text-3xl font-semibold mb-6">Impressum</h1>

        <div className="mb-6">
          <p className="font-medium">MOUVCON</p>
          <p>Markus Haas</p>
          <p>Hauptstr. 4</p>
          <p>55546 Biebelsheim</p>
          <p>GERMANY</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Kontakt</h2>
          <p>E‑Mail: <a href="mailto:mh@mouvcon.com" className="text-brand-accent underline">mh@mouvcon.com</a></p>
          <p>Mobil: <a href="tel:+491517978313" className="underline">+49 151 7978313</a></p>
          <p>Website: <a href="https://www.mouvcon.com" className="underline">www.mouvcon.com</a></p>
        </div>

        <div className="mb-6">
          <h3 className="font-medium">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
          <p>Markus Haas (Anschrift siehe oben)</p>
        </div>

        <div>
          <h3 className="font-medium">Handelsregister / Umsatzsteuer-ID</h3>
          <p>Nicht angegeben</p>
        </div>

        <div className="mt-8 text-sm text-gray-600">
          <h4 className="font-medium">Haftungsausschluss</h4>
          <p>
            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt verlinkter Seiten sind ausschließlich deren Betreiber verantwortlich.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Impressum;
