'use client';

import Image from 'next/image';
import { process } from '@/app/lib/site-data';

export function ProcessIndex({ active, onHover }: { active: number; onHover: (index: number) => void }) {
  const activeStep = process[active];
  return (
    <div className="work-index" data-reveal>
      <div className="work-index-list">
        {process.map((step, index) => (
          <button
            key={step.number}
            className={`work-index-row ${index === active ? 'is-active' : ''}`}
            onMouseEnter={() => onHover(index)}
            onFocus={() => onHover(index)}
            onClick={() => onHover(index)}
          >
            <span className="work-index-number">{step.number}</span>
            <span className="work-index-title">{step.label}</span>
          </button>
        ))}
      </div>
      <div className="work-index-preview">
        <span className="work-index-eyebrow">STAP {activeStep.number}</span>
        <Image key={activeStep.number} src={activeStep.image} alt="" fill quality={68} sizes="(max-width: 900px) 100vw, 66vw" />
        <div className="work-index-preview-caption">
          <strong>{activeStep.title}</strong>
        </div>
      </div>
    </div>
  );
}
