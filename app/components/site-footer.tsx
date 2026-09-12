import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { InstagramMark } from './icons';

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-top" data-reveal>
        <div className="footer-brand">
          <Link href="/#top" className="footer-logo" aria-label="Trivare home"><Image src="/trivare-logo.png" alt="Trivare" width={1086} height={362} /></Link>
        </div>
        <div>
          <h3>NAVIGATIE</h3>
          <nav>
            <Link href="/diensten">Diensten</Link>
            <Link href="/werk">Werk</Link>
            <Link href="/werkwijze">Werkwijze</Link>
            <Link href="/over-trivare">Over Trivare</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
        <div>
          <h3>CONTACT</h3>
          <div className="footer-contact-links">
            <a href="mailto:contact@trivare.nl">contact@trivare.nl</a>
            <a className="footer-instagram" href="https://www.instagram.com/trivare.studio" target="_blank" rel="noreferrer"><InstagramMark /><span>Instagram</span><ArrowUpRight /></a>
          </div>
          <p>Overijssel, Nederland</p>
        </div>
      </div>
      <div className="footer-bottom"><span>© 2026 Trivare</span><span>Webdesign · SEO · CRO · Branding · Onderhoud</span><span className="footer-legal"><Link href="/privacybeleid">Privacybeleid</Link><Link href="/algemene-voorwaarden">Algemene voorwaarden</Link></span><span>Overijssel, Nederland</span></div>
    </footer>
  );
}
