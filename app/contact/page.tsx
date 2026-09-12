import type { Metadata } from 'next';
import { ContactContent } from './contact-content';

export const metadata: Metadata = {
  title: 'Contact — Trivare',
  description: 'Plan een kennismaking of stuur een bericht. Trivare reageert meestal binnen 1 werkdag.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact — Trivare',
    description: 'Plan een kennismaking of stuur een bericht. Trivare reageert meestal binnen 1 werkdag.',
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
