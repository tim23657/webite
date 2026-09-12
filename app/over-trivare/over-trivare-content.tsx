'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SiteHeader } from '@/app/components/site-header';
import { SiteFooter } from '@/app/components/site-footer';

const points = [
  { number: '01', title: 'Direct contact', text: 'Je schakelt rechtstreeks met mij tijdens het hele project.' },
  { number: '02', title: 'Samen keuzes maken', text: 'Ontwerp en belangrijke keuzes bespreken we samen.' },
  { number: '03', title: 'Ook na livegang', text: 'Ook na oplevering kan ik helpen met onderhoud en gerichte verbeteringen.' },
];

export function OverTrivareContent() {
  const [activePoint, setActivePoint] = useState(0);
  const pointsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!matchMedia('(pointer: coarse)').matches) return;
    const container = pointsRef.current;
    if (!container) return;
    const rows = Array.from(container.querySelectorAll<HTMLButtonElement>('button'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = rows.indexOf(entry.target as HTMLButtonElement);
        if (index !== -1) setActivePoint(index);
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealItems.forEach((item) => { item.dataset.visible = 'true'; });
      return;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { (entry.target as HTMLElement).dataset.visible = 'true'; observer.unobserve(entry.target); }
    }), { threshold: .13 });
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="about-page">
      <SiteHeader />

      <section className="about-page-hero">
        <div className="about-page-hero-image about-page-hero-image-portrait" data-reveal>
          <Image src="/team-tim.jpg" alt="Tim Zwerus, oprichter van Trivare" fill priority sizes="(max-width: 760px) 100vw, 58vw" />
          <span>TIM ZWERUS<i>Oprichter van Trivare</i></span>
        </div>
        <div className="about-page-hero-copy" data-reveal>
          <h1>Waarom Trivare?</h1>
          <p>Mijn naam is Tim Zwerus, eigenaar en oprichter van Trivare.</p>
          <p>Marketing heb ik altijd al interessant gevonden en inmiddels heb ik hier zo&apos;n vier jaar ervaring mee. Op een gegeven moment besloot ik om voor mezelf te beginnen en van iets wat ik graag doe mijn eigen bedrijf te maken. Zo is Trivare ontstaan, en dat doe ik nu met ontzettend veel plezier.</p>
          <p>Vooral de combinatie met webdesign vind ik leuk. Beginnen met een idee en dat uiteindelijk uitwerken tot een website die echt bij een bedrijf past.</p>
          <p>Dat doe ik graag in overleg. Ik maak een eerste ontwerp, jij kijkt mee en geeft aan wat je ervan vindt. Vanuit jouw wensen en feedback werken we verder tot de website staat zoals jij hem voor ogen hebt.</p>
        </div>
      </section>

      <section className="about-page-dark">
        <div className="about-page-dark-heading" data-reveal>
          <p className="section-label light">WAT JE MAG VERWACHTEN</p>
          <h2>Zo werk ik.</h2>
        </div>
        <div className="about-page-points" ref={pointsRef}>
          {points.map((point, index) => (
            <button
              type="button"
              key={point.number}
              className={index === activePoint ? 'is-active' : ''}
              onMouseEnter={() => setActivePoint(index)}
              onFocus={() => setActivePoint(index)}
              data-reveal
            >
              <span>{point.number}</span>
              <div><strong>{point.title}</strong><p>{point.text}</p></div>
            </button>
          ))}
        </div>
      </section>

      <section className="about-page-closing" data-reveal>
        <p className="section-label">KENNISMAKEN</p>
        <h2>Vertel me waar je aan wilt werken.</h2>
        <p>Heb je een nieuwe website nodig of wil je je huidige website verbeteren? Vertel me kort waar je mee bezig bent. Dan kijken we samen wat er nodig is.</p>
        <Link className="primary-cta" href="/contact"><span>Plan een kennismaking</span><span className="cta-arrow"><ArrowUpRight /></span></Link>
      </section>

      <SiteFooter />
    </main>
  );
}
