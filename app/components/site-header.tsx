'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

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

  return (
    <>
      <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
        <Link href="/#top" className="official-logo" aria-label="Trivare home"><Image src="/trivare-logo.png" alt="Trivare" width={1086} height={362} priority /></Link>
        <nav className="nav-links" aria-label="Hoofdnavigatie">
          {navItems.map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}
        </nav>
        <Link className="outline-cta" href="/contact"><span>Kennismaken</span><ArrowUpRight /></Link>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Open menu">{menuOpen ? <X /> : <Menu />}</button>
      </header>
      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav>{navItems.map((item) => <Link key={item.label} href={item.href} onClick={closeMenuAndNavigate}>{item.label}</Link>)}</nav>
        <Link className="mobile-menu-cta" href="/contact" onClick={closeMenuAndNavigate}>Plan een kennismaking <ArrowUpRight /></Link>
      </div>
    </>
  );
}
