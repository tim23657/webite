import type { Metadata } from 'next';
import { WerkContent } from './werk-content';

export const metadata: Metadata = {
  title: 'Ons werk — Trivare',
  description: 'Een selectie van websites die we mochten ontwerpen, vernieuwen of verder uitwerken voor bedrijven in Overijssel en daarbuiten.',
  alternates: { canonical: '/werk' },
  openGraph: {
    title: 'Ons werk — Trivare',
    description: 'Een selectie van websites die we mochten ontwerpen, vernieuwen of verder uitwerken.',
  },
};

export default function WerkPage() {
  return <WerkContent />;
}
