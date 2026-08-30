import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://trivare.nl'),
  title: 'Trivare — Websites die bedrijven vooruitbrengen',
  description: 'Strategisch webdesign, UX, SEO, CRO, onderhoud en branding voor ambitieuze mkb-bedrijven in Overijssel.',
  openGraph: {
    title: 'Trivare — Websites die bedrijven vooruitbrengen',
    description: 'Strategisch webdesign, UX, SEO, CRO, onderhoud en branding voor ambitieuze mkb-bedrijven in Overijssel.',
    type: 'website',
    locale: 'nl_NL',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Trivare — Websites die bedrijven vooruitbrengen.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trivare — Websites die bedrijven vooruitbrengen',
    description: 'Professionele websites en digitale groei voor het Nederlandse mkb.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
