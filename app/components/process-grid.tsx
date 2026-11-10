'use client';

import type { ComponentType, MouseEvent } from 'react';
import { ConversationIcon, DesignIcon, HammerIcon, RocketIcon } from '@/app/components/animated-icons';
import { homeWerkwijzeSteps } from '@/app/lib/site-data';
import { onCardPointerEnter, onCardPointerLeave } from '@/app/components/card-intent';

const icons: ComponentType[] = [ConversationIcon, DesignIcon, HammerIcon, RocketIcon];

function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--px', `${((event.clientX - rect.left) / rect.width) * 100}%`);
  card.style.setProperty('--py', `${((event.clientY - rect.top) / rect.height) * 100}%`);
}

export function ProcessGrid() {
  return (
    <div className="process-grid">
      {homeWerkwijzeSteps.map((step, index) => {
        const Icon = icons[index];
        return (
          <div className="process-card" key={step.number} data-reveal onMouseMove={handleMouseMove} onPointerEnter={onCardPointerEnter} onPointerLeave={onCardPointerLeave}>
            <span className="process-card-glow" aria-hidden="true" />
            <span className="process-card-icon" aria-hidden="true"><Icon /></span>
            <span className="process-card-number">{step.number}</span>
            <h3 className="process-card-title">{step.title}</h3>
            <p className="process-card-text">{step.text}</p>
          </div>
        );
      })}
    </div>
  );
}
