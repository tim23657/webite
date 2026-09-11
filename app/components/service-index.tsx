'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { services } from '@/app/lib/site-data';

export function ServiceIndex({ active, onHover }: { active: number; onHover: (index: number) => void }) {
  const activeService = services[active];
  const listRef = useRef<HTMLDivElement>(null);
  const onHoverRef = useRef(onHover);
  useEffect(() => { onHoverRef.current = onHover; });

  useEffect(() => {
    if (!matchMedia('(pointer: coarse)').matches) return;
    const container = listRef.current;
    if (!container) return;
    const rows = Array.from(container.querySelectorAll<HTMLButtonElement>('.work-index-row'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = rows.indexOf(entry.target as HTMLButtonElement);
        if (index !== -1) onHoverRef.current(index);
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="work-index service-index" data-reveal>
      <div className="work-index-list" ref={listRef}>
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
