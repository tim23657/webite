'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { SiteHeader } from '@/app/components/site-header';
import { SiteFooter } from '@/app/components/site-footer';
import { process } from '@/app/lib/site-data';

const layouts = ['right', 'left', 'right'] as const;

export default function WerkwijzePage() {
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

      <section className="section case-flow-intro" id="werkwijze" style={{ paddingTop: 'clamp(150px, 17vw, 220px)' }}>
        <div className="section-intro" data-reveal>
          <p className="section-label process-eyebrow">· HOE WIJ WERKEN</p>
          <div>
            <h2 className="work-heading">Van idee naar <span>een website die staat.</span></h2>
            <p>We werken stap voor stap van richting naar ontwerp, realisatie en livegang.</p>
          </div>
        </div>
      </section>

      <div className="case-flow">
        {process.map((step, index) => (
          <section className={`case-block case-block--${layouts[index % layouts.length]}`} key={step.number} data-reveal>
            <div className="case-block-visual">
              <Image src={step.image} alt="" fill quality={68} sizes="(max-width: 900px) 100vw, 60vw" />
            </div>
            <div className="case-block-copy">
              <span className="case-block-eyebrow">{step.number} · {step.label}</span>
              <h3>{step.title}</h3>
            </div>
          </section>
        ))}
      </div>

      <SiteFooter />
    </main>
  );
}
