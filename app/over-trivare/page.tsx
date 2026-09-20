import type { Metadata } from 'next';
import { OverTrivareContent } from './over-trivare-content';

export const metadata: Metadata = {
  title: 'Over Trivare: persoonlijk webdesign voor ondernemers',
  description: 'Maak kennis met Tim Zwerus, oprichter van Trivare: persoonlijk contact, samen keuzes maken en ook na livegang betrokken bij je website.',
  alternates: { canonical: '/over-trivare' },
  openGraph: {
    title: 'Over Trivare: persoonlijk webdesign voor ondernemers',
    description: 'Maak kennis met Tim Zwerus, oprichter van Trivare: persoonlijk contact, samen keuzes maken en ook na livegang betrokken bij je website.',
    url: '/over-trivare',
    siteName: 'Trivare',
  },
};

export default function AboutTrivarePage() {
  return <OverTrivareContent />;
}
