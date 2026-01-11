import { SectionData } from './types';
import visionaryImg from './FOTOS/01FBFE68-7248-40AD-B821-B5BB33426BCA.PNG';
import innovativeImg from './FOTOS/291B442C-7403-42C7-9659-6C5E3AA84C04.PNG';
import sustainableImg from './FOTOS/21D25FFA-8751-4125-94E6-8299EA912826.PNG';

// Placeholder SVG for Respektvoll section
const respectfulImg = 'data:image/svg+xml,%3Csvg width="800" height="600" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="800" height="600" fill="%23d4d4d4"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%23737373"%3EPlatzhalter%3C/text%3E%3C/svg%3E';

export const SECTIONS: SectionData[] = [
  {
    id: 'visionary',
    title: 'Ich blicke über den Horizont von heute hinaus, um die Märkte von <span class="text-white font-medium">morgen</span> zu gestalten.',
    subtitle: 'Visionär',
    description: 'Vision bedeutet für mich nicht Träumerei, sondern die Fähigkeit, Muster zu erkennen, bevor sie offensichtlich werden.',
    imageUrl: visionaryImg,
    alignment: 'left',
  },
  {
    id: 'innovative',
    title: 'Technologie ist mein Werkzeug, <span class="text-white font-medium">Fortschritt</span> mein Resultat.',
    subtitle: 'Innovativ',
    description: 'Innovation ist bei Mouvcon kein Selbstzweck. Sie muss messbaren Wert schaffen und Barrieren durchbrechen.',
    imageUrl: innovativeImg,
    alignment: 'right',
  },
  {
    id: 'sustainable',
    title: 'Wachstum ohne Beständigkeit ist bedeutungslos. Ich baue auf <span class="text-white font-medium">Generationen</span>.',
    subtitle: 'Nachhaltig',
    description: 'Nachhaltigkeit im Consulting bedeutet für mich, Lösungen zu schaffen, die auch in einem Jahrzehnt noch Bestand haben.',
    imageUrl: sustainableImg,
    alignment: 'left',
  },
  {
    id: 'respectful',
    title: 'Exzellenz basiert auf <span class="text-white font-medium">Integrität</span> und gegenseitiger Wertschätzung.',
    subtitle: 'Respektvoll',
    description: 'Ich begegne meinen Klienten auf Augenhöhe. Ehrlichkeit ist der Kern jeder erfolgreichen Partnerschaft.',
    imageUrl: respectfulImg,
    alignment: 'right',
  },
];