'use client';

import { useEffect, useRef, useState } from 'react';
import { SiteHeader } from '@/app/components/site-header';
import { SiteFooter } from '@/app/components/site-footer';
import { ServiceIndex } from '@/app/components/service-index';
import { capabilities, investmentSteps } from '@/app/lib/site-data';

export default function DienstenPage() {
  const [serviceActive, setServiceActive] = useState(0);
  const [investmentActive, setInvestmentActive] = useState(0);
  const investmentListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!matchMedia('(pointer: coarse)').matches) return;
    const container = investmentListRef.current;
    if (!container) return;
    const rows = Array.from(container.querySelectorAll<HTMLButtonElement>('.investment-block-row'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = rows.indexOf(entry.target as HTMLButtonElement);
        if (index !== -1) setInvestmentActive(index);
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { revealItems.forEach((item) => item.dataset.visible = 'true'); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { (entry.target as HTMLElement).dataset.visible = 'true'; observer.unobserve(entry.target); }
    }), { threshold: .13 });
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <SiteHeader />

      <section className="section services" id="diensten" style={{ paddingTop: 'clamp(150px, 17vw, 220px)' }}>
        <div className="section-intro" data-reveal><p className="section-label">DIENSTEN</p><div><h2 className="services-heading">Een website die past <span>bij je bedrijf.</span></h2><p>Nieuwe website, redesign of optimalisatie. We kijken naar wat je nodig hebt en bouwen van daaruit verder.</p></div></div>
        <ServiceIndex active={serviceActive} onHover={setServiceActive} />
        <p className="service-tags">DESIGN · BRANDING · UX · SEO · CRO · ONDERHOUD</p>
        <div className="capability-row" data-reveal>{capabilities.map((capability) => <div className="capability-item" key={capability.number}><strong>{capability.title}</strong><span>{capability.text}</span></div>)}</div>

        <div className="investment-block" data-reveal>
          <div className="investment-copy">
            <p className="section-label">INVESTERING</p>
            <h2>Vooraf duidelijk <span>wat we gaan maken.</span></h2>
            <p>Je weet vooraf wat er gebeurt, wat het kost en wanneer je live gaat.</p>
          </div>
          <div className="investment-block-list" ref={investmentListRef}>
            {investmentSteps.map((step, index) => (
              <button
                type="button"
                className={`investment-block-row ${index === investmentActive ? 'is-active' : ''}`}
                key={step.number}
                onMouseEnter={() => setInvestmentActive(index)}
                onFocus={() => setInvestmentActive(index)}
                onClick={() => setInvestmentActive(index)}
              >
                <span>{step.number}</span>
                <div><strong>{step.title}</strong><p>{step.text}</p></div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
