import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'], display: 'swap' });
const manrope = Manrope({ variable: '--font-heading', subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://trivare.nl'),
  title: 'Trivare — Websites die vertrouwen uitstralen',
  description: 'Professioneel webdesign, redesign en website-optimalisatie voor bedrijven in Overijssel en daarbuiten.',
  openGraph: {
    title: 'Trivare — Websites die vertrouwen uitstralen',
    description: 'Professioneel webdesign, redesign en website-optimalisatie voor bedrijven in Overijssel en daarbuiten.',
    type: 'website',
    locale: 'nl_NL',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Trivare — Websites die vertrouwen uitstralen.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trivare — Websites die vertrouwen uitstralen',
    description: 'Professioneel webdesign, redesign en optimalisatie.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl">
      <body className={`${inter.variable} ${manrope.variable}`}>{children}</body>
    </html>
  );
}

