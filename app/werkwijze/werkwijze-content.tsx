'use client';

import Image from 'next/image';
import { SiteHeader } from '@/app/components/site-header';
import { SiteFooter } from '@/app/components/site-footer';
import { process } from '@/app/lib/site-data';
import { useReveal } from '@/app/components/use-reveal';

const layouts = ['right', 'left', 'right'] as const;

export function WerkwijzeContent() {
  useReveal();

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
              <span className="case-block-eyebrow">{step.label}</span>
              <h3>{step.title}</h3>
            </div>
          </section>
        ))}
      </div>

      <SiteFooter />
    </main>
  );
}
