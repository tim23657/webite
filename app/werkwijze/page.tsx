import type { Metadata } from 'next';
import { WerkwijzeContent } from './werkwijze-content';

export const metadata: Metadata = {
  title: 'Werkwijze: van idee naar website | Trivare',
  description: 'Hoe Trivare te werk gaat: van richting en ontwerp tot realisatie en livegang, stap voor stap en met korte lijnen tijdens het traject.',
  alternates: { canonical: '/werkwijze' },
  openGraph: {
    title: 'Werkwijze: van idee naar website | Trivare',
    description: 'Hoe Trivare te werk gaat: van richting en ontwerp tot realisatie en livegang, stap voor stap en met korte lijnen tijdens het traject.',
    url: '/werkwijze',
    siteName: 'Trivare',
  },
};

export default function WerkwijzePage() {
  return <WerkwijzeContent />;
}
