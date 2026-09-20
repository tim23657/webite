import type { Metadata } from 'next';
import { TrivareSite } from './trivare-site';

export const metadata: Metadata = {
  title: 'Webdesign voor ondernemers | Trivare',
  description: 'Trivare ontwerpt en verbetert websites voor ondernemers. Persoonlijk webdesign, redesign en optimalisatie, met aandacht voor uitstraling en gebruiksgemak.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Webdesign voor ondernemers | Trivare',
    description: 'Trivare ontwerpt en verbetert websites voor ondernemers. Persoonlijk webdesign, redesign en optimalisatie, met aandacht voor uitstraling en gebruiksgemak.',
    url: '/',
    siteName: 'Trivare',
  },
};

export default function Home() {
  return <TrivareSite />;
}

