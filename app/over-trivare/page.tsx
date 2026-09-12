import type { Metadata } from 'next';
import { OverTrivareContent } from './over-trivare-content';

export const metadata: Metadata = {
  title: 'Over Trivare',
  description: 'Maak kennis met Tim Zwerus, oprichter van Trivare, en de persoonlijke aanpak achter elk project.',
  alternates: { canonical: '/over-trivare' },
  openGraph: {
    title: 'Over Trivare',
    description: 'Maak kennis met Tim Zwerus, oprichter van Trivare, en de persoonlijke aanpak achter elk project.',
  },
};

export default function AboutTrivarePage() {
  return <OverTrivareContent />;
}
