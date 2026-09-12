import type { Metadata } from 'next';
import { WerkwijzeContent } from './werkwijze-content';

export const metadata: Metadata = {
  title: 'Werkwijze — Trivare',
  description: 'Van idee naar een website die staat: hoe Trivare stap voor stap van richting naar ontwerp, realisatie en livegang werkt.',
  alternates: { canonical: '/werkwijze' },
  openGraph: {
    title: 'Werkwijze — Trivare',
    description: 'Van idee naar een website die staat: hoe we stap voor stap te werk gaan.',
  },
};

export default function WerkwijzePage() {
  return <WerkwijzeContent />;
}
