'use client';

import { useEffect, useState } from 'react';
import { SiteHeader } from '@/app/components/site-header';
import { SiteFooter } from '@/app/components/site-footer';
import { ServiceIndex } from '@/app/components/service-index';
import { capabilities, investmentSteps } from '@/app/lib/site-data';

export default function DienstenPage() {
  const [serviceActive, setServiceActive] = useState(0);

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
          <div className="investment-block-list">
            {investmentSteps.map((step) => (
              <div className="investment-block-row" key={step.number}>
                <span>{step.number}</span>
                <div><strong>{step.title}</strong><p>{step.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
