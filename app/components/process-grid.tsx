'use client';

import type { MouseEvent } from 'react';
import { homeWerkwijzeSteps } from '@/app/lib/site-data';

function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--px', `${((event.clientX - rect.left) / rect.width) * 100}%`);
  card.style.setProperty('--py', `${((event.clientY - rect.top) / rect.height) * 100}%`);
}

export function ProcessGrid() {
  return (
    <div className="process-grid" data-reveal>
      {homeWerkwijzeSteps.map((step) => (
        <div className="process-card" key={step.number} onMouseMove={handleMouseMove}>
          <span className="process-card-glow" aria-hidden="true" />
          <span className="process-card-number">{step.number}</span>
          <h3 className="process-card-title">{step.title}</h3>
          <p className="process-card-text">{step.text}</p>
        </div>
      ))}
    </div>
  );
}
