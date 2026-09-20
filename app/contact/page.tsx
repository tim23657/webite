import type { Metadata } from 'next';
import { ContactContent } from './contact-content';

export const metadata: Metadata = {
  title: 'Contact en kennismaking | Trivare',
  description: 'Plan een vrijblijvende kennismaking of stuur een bericht. Trivare denkt met je mee over je website en reageert meestal binnen een werkdag.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact en kennismaking | Trivare',
    description: 'Plan een vrijblijvende kennismaking of stuur een bericht. Trivare denkt met je mee over je website en reageert meestal binnen een werkdag.',
    url: '/contact',
    siteName: 'Trivare',
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
