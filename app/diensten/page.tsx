import type { Metadata } from 'next';
import { DienstenContent } from './diensten-content';

export const metadata: Metadata = {
  title: 'Diensten — Trivare',
  description: 'Website ontwerp, redesign en optimalisatie op maat. Ontdek hoe Trivare jouw bedrijf online sterker neerzet.',
  alternates: { canonical: '/diensten' },
  openGraph: {
    title: 'Diensten — Trivare',
    description: 'Website ontwerp, redesign en optimalisatie op maat. Ontdek hoe Trivare jouw bedrijf online sterker neerzet.',
  },
};

export default function DienstenPage() {
  return <DienstenContent />;
}
