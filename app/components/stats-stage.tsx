'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { stats } from '@/app/lib/site-data';

export function StatsStage() {
  const [active, setActive] = useState(0);
  const [flash, setFlash] = useState<{ dir: number; key: number } | null>(null);
  const activeStat = stats[active];
  const go = (dir: number) => {
    setActive((prev) => (prev + dir + stats.length) % stats.length);
    setFlash({ dir, key: Date.now() });
  };

  return (
    <div className="stats-stage" data-reveal>
      <div className="stats-grid">
        <div className="stats-copy" key={activeStat.number}>
          <span className="stats-copy-rule" aria-hidden="true" />
          <p className="stats-eyebrow">{activeStat.number} / {String(stats.length).padStart(2, '0')}</p>
          <p className="stats-number">{activeStat.stat}</p>
          <p className="stats-title">{activeStat.title}</p>
        </div>
        <div className="stats-media">
          {stats.map((item, index) => (
            <div key={item.number} className={`stats-visual ${index === active ? 'is-active' : ''}`} aria-hidden="true">
              <Image src={item.image} alt="" fill quality={72} priority={index === 0} sizes="(max-width: 900px) 100vw, 480px" />
            </div>
          ))}
          {flash ? (
            <span
              key={flash.key}
              className={`stats-flash ${flash.dir > 0 ? 'stats-flash-right' : 'stats-flash-left'}`}
              aria-hidden="true"
            />
          ) : null}
        </div>
      </div>
      <div className="stats-footer">
        <div className="stats-controls">
          <button type="button" onClick={() => go(-1)} aria-label="Vorige statistiek"><ArrowLeft /></button>
          <button type="button" onClick={() => go(1)} aria-label="Volgende statistiek"><ArrowRight /></button>
        </div>
        <div className="stats-dots">
          {stats.map((item, index) => (
            <button
              key={item.number}
              type="button"
              className={index === active ? 'is-active' : ''}
              aria-label={`Ga naar statistiek ${item.stat}`}
              onClick={() => setActive(index)}
            >
              <span className="stats-dot-tooltip">{item.stat}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
