'use client';

import Image from 'next/image';
import { services } from '@/app/lib/site-data';

export function ServiceIndex({ active, onHover }: { active: number; onHover: (index: number) => void }) {
  const activeService = services[active];
  return (
    <div className="work-index" data-reveal>
      <div className="work-index-list">
        {services.map((service, index) => (
          <button
            key={service.number}
            className={`work-index-row ${index === active ? 'is-active' : ''}`}
            onMouseEnter={() => onHover(index)}
            onFocus={() => onHover(index)}
            onClick={() => onHover(index)}
          >
            <span className="work-index-number">{service.number}</span>
            <span className="work-index-title">{service.title}</span>
          </button>
        ))}
      </div>
      <div className="work-index-preview">
        <span className="work-index-eyebrow">DIENST {activeService.number}</span>
        <Image key={activeService.number} src={activeService.image} alt="" fill sizes="(max-width: 900px) 100vw, 66vw" />
        <div className="work-index-preview-caption">
          <strong>{activeService.title}</strong>
          <p>{activeService.text}</p>
        </div>
      </div>
    </div>
  );
}
