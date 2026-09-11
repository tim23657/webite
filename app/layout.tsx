import type { Metadata } from 'next';
import { Inter, Manrope, Bricolage_Grotesque } from 'next/font/google';
import './globals.css';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'], display: 'swap' });
const manrope = Manrope({ variable: '--font-heading', subsets: ['latin'], display: 'swap' });
const bricolage = Bricolage_Grotesque({ variable: '--font-display', subsets: ['latin'], display: 'swap' });

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
      <body className={`${inter.variable} ${manrope.variable} ${bricolage.variable}`}>
        <div className="scroll-progress" aria-hidden="true" />
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              if (!matchMedia('(pointer: coarse)').matches) return;
              var selectors = ['.service-row','.capability-item','.project-card','.proof-band-grid > div','.proof-strip > div','.approach-words span','.about-copy h2 span','.about-image','.values-grid article','.investment-panel article','.quiet-link','.hero-services-link'];
              var io = new IntersectionObserver(function(entries){
                entries.forEach(function(entry){ entry.target.classList.toggle('scroll-glow', entry.isIntersecting); });
              }, { threshold: 0.55 });
              function scan(){
                selectors.forEach(function(sel){
                  document.querySelectorAll(sel).forEach(function(el){ io.observe(el); });
                });
              }
              function start(){
                scan();
                new MutationObserver(function(){ scan(); }).observe(document.body, { childList: true, subtree: true });
              }
              if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
            })();`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
              var bar = document.querySelector('.scroll-progress');
              if (!bar) return;
              var ticking = false;
              function update(){
                ticking = false;
                var scrollTop = window.scrollY || document.documentElement.scrollTop;
                var height = document.documentElement.scrollHeight - window.innerHeight;
                var ratio = height > 0 ? Math.min(1, Math.max(0, scrollTop / height)) : 0;
                bar.style.setProperty('--scroll-progress', String(ratio));
              }
              function onScroll(){
                if (!ticking) { ticking = true; requestAnimationFrame(update); }
              }
              document.addEventListener('scroll', onScroll, { passive: true });
              window.addEventListener('resize', onScroll);
              update();
            })();`,
          }}
        />
      </body>
    </html>
  );
}

