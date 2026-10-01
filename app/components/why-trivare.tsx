'use client';

import type { ComponentType, MouseEvent } from 'react';
import {
  CodeIcon,
  GesprekIcon,
  KlokIcon,
  MarketingIcon,
  OndersteuningIcon,
  OntwerpIcon,
  PrijsIcon,
  SchermenIcon,
} from '@/app/components/why-trivare-icons';
import { whyTrivare, whyTrivareBadges } from '@/app/lib/site-data';

const icons: ComponentType[] = [
  GesprekIcon, PrijsIcon, KlokIcon, OntwerpIcon, MarketingIcon, SchermenIcon, CodeIcon, OndersteuningIcon,
];

function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--px', `${((event.clientX - rect.left) / rect.width) * 100}%`);
  card.style.setProperty('--py', `${((event.clientY - rect.top) / rect.height) * 100}%`);
}

export function WhyTrivare() {
  return (
    <section className="section why-trivare-section" id="waarom-trivare">
      <div className="section-intro" data-reveal>
        <span className="why-label-rule" aria-hidden="true" />
        <h2 className="display-heading">Waarom Trivare?</h2>
        <p className="why-intro-text">Persoonlijk contact, duidelijke afspraken en een website die bij jouw bedrijf past.</p>
        <span className="why-intro-rule" aria-hidden="true" />
      </div>

      <div className="process-grid why-grid" data-reveal>
        {whyTrivare.map((item, index) => {
          const Icon = icons[index];
          return (
            <div className="process-card" key={item.number} onMouseMove={handleMouseMove}>
              <span className="process-card-glow" aria-hidden="true" />
              <span className="process-card-icon" aria-hidden="true"><Icon /></span>
              <span className="process-card-number">{item.number}</span>
              <h3 className="process-card-title">{item.title}</h3>
              <p className="process-card-text">{item.text}</p>
              <span className="process-card-badge">{whyTrivareBadges[index]}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
