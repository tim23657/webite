import type { Metadata } from 'next';
import { DienstenContent } from './diensten-content';

export const metadata: Metadata = {
  title: 'Website laten maken, redesign & optimalisatie | Trivare',
  description: 'Nieuwe website, redesign of optimalisatie: Trivare bouwt op maat en denkt mee over ontwerp, techniek en gebruiksgemak, van gesprek tot livegang.',
  alternates: { canonical: '/diensten' },
  openGraph: {
    title: 'Website laten maken, redesign & optimalisatie | Trivare',
    description: 'Nieuwe website, redesign of optimalisatie: Trivare bouwt op maat en denkt mee over ontwerp, techniek en gebruiksgemak, van gesprek tot livegang.',
    url: '/diensten',
    siteName: 'Trivare',
  },
};

export default function DienstenPage() {
  return <DienstenContent />;
}
