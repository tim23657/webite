'use client';

import Image from 'next/image';
import Link from 'next/link';
import { lazy, Suspense, useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const DesignRequestDialog = lazy(() => import('@/app/components/design-request-dialog'));

const navItems = [
  { label: 'Diensten', href: '/diensten' },
  { label: 'Werk', href: '/werk' },
  { label: 'Werkwijze', href: '/werkwijze' },
  { label: 'Over Trivare', href: '/over-trivare' },
  { label: 'Contact', href: '/contact' },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogLoaded, setDialogLoaded] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 20);
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return () => removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenuAndNavigate = () => setMenuOpen(false);
  const openDesignRequest = () => { setDialogOpen(true); setDialogLoaded(true); setMenuOpen(false); };

  return (
    <>
      <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
        <Link href="/#top" className="official-logo" aria-label="Trivare home"><Image src="/trivare-logo.png" alt="Trivare" width={1086} height={362} priority /></Link>
        <nav className="nav-links" aria-label="Hoofdnavigatie">
          {navItems.map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}
        </nav>
        <button type="button" className="outline-cta cta-shine" onClick={openDesignRequest}><span>Vraag een gratis ontwerp aan</span><ArrowUpRight /></button>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Open menu">{menuOpen ? <X /> : <Menu />}</button>
      </header>
      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav>{navItems.map((item) => <Link key={item.label} href={item.href} onClick={closeMenuAndNavigate}>{item.label}</Link>)}</nav>
        <button type="button" className="mobile-menu-cta" onClick={openDesignRequest}>Vraag een gratis ontwerp aan <ArrowUpRight /></button>
      </div>

      {dialogLoaded && (
        <Suspense fallback={null}>
          <DesignRequestDialog open={dialogOpen} onOpenChange={setDialogOpen} />
        </Suspense>
      )}
    </>
  );
}
