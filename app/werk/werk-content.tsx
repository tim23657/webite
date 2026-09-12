'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SiteHeader } from '@/app/components/site-header';
import { SiteFooter } from '@/app/components/site-footer';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { projects } from '@/app/lib/site-data';

const layouts = ['full', 'right', 'left'] as const;

export function WerkContent() {
  const [caseIndex, setCaseIndex] = useState<number | null>(null);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { revealItems.forEach((item) => item.dataset.visible = 'true'); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { (entry.target as HTMLElement).dataset.visible = 'true'; observer.unobserve(entry.target); }
    }), { threshold: .13 });
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const selectedCase = caseIndex === null ? null : projects[caseIndex];

  return (
    <main>
      <SiteHeader />

      <section className="section case-flow-intro" id="werk" style={{ paddingTop: 'clamp(150px, 17vw, 220px)' }}>
        <div className="section-intro" data-reveal>
          <p className="section-label">SELECTIE</p>
          <div>
            <h2 className="work-heading">Een selectie <span>van ons werk.</span></h2>
            <p>Een aantal websites die we mochten ontwerpen, vernieuwen of verder uitwerken.</p>
          </div>
        </div>
      </section>

      <div className="case-flow">
        {projects.map((project, index) => (
          <section className={`case-block case-block--${layouts[index % layouts.length]}`} key={project.slug} data-reveal>
            <div className="case-block-visual">
              <Image src={`/projects/${project.slug}.jpg`} alt="" fill quality={68} sizes="(max-width: 900px) 100vw, 70vw" />
            </div>
            <div className="case-block-copy">
              <span className="case-block-eyebrow">CASE {project.number} · {project.label}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <button type="button" onClick={() => setCaseIndex(index)}>Bekijk case <ArrowUpRight /></button>
            </div>
          </section>
        ))}
      </div>

      <section className="section case-flow-cta">
        <Link className="quiet-link" href="/contact"><span>Bespreek jouw project</span><ArrowUpRight /></Link>
      </section>

      <SiteFooter />

      <Dialog open={caseIndex !== null} onOpenChange={(open) => !open && setCaseIndex(null)}>
        {selectedCase && (
          <DialogContent className="case-dialog">
            <DialogHeader><DialogTitle>{selectedCase.title}</DialogTitle><DialogDescription>{selectedCase.label}</DialogDescription></DialogHeader>
            <div className="case-visual"><Image src={`/projects/${selectedCase.slug}.jpg`} alt="" fill sizes="90vw" /></div>
            <div className="case-detail-grid">
              <div><span>PROBLEEM</span><p>{selectedCase.problem}</p></div>
              <div><span>AANPAK</span><p>{selectedCase.approach}</p></div>
              <div><span>UITVOERING</span><p>{selectedCase.execution}</p></div>
              <div><span>RESULTAAT</span><p>{selectedCase.result}</p></div>
            </div>
            <div className="case-proof">{selectedCase.proof.map((item) => <span key={item}>{item}</span>)}</div>
            <Link className="primary-cta" href="/contact" onClick={() => setCaseIndex(null)}><span>Bespreek jouw project</span><span className="cta-arrow"><ArrowUpRight /></span></Link>
          </DialogContent>
        )}
      </Dialog>
    </main>
  );
}
