import type { Metadata } from 'next';
import { WerkContent } from './werk-content';

export const metadata: Metadata = {
  title: 'Werk: geselecteerde websites | Trivare',
  description: 'Een selectie van websites die Trivare ontwierp, vernieuwde of verder uitwerkte, van eerste idee tot een resultaat waar bedrijven trots op zijn.',
  alternates: { canonical: '/werk' },
  openGraph: {
    title: 'Werk: geselecteerde websites | Trivare',
    description: 'Een selectie van websites die Trivare ontwierp, vernieuwde of verder uitwerkte, van eerste idee tot een resultaat waar bedrijven trots op zijn.',
    url: '/werk',
    siteName: 'Trivare',
  },
};

export default function WerkPage() {
  return <WerkContent />;
}
