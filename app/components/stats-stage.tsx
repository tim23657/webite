'use client';

import Image from 'next/image';
import { KeyboardEvent, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { stats } from '@/app/lib/site-data';

const TRANSITION_MS = 700;

export function StatsStage() {
  const [active, setActive] = useState(0);
  const [transition, setTransition] = useState<{ from: number; to: number; dir: number } | null>(null);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = (dir: number) => {
    if (transition) return;
    const next = (active + dir + stats.length) % stats.length;
    setTransition({ from: active, to: next, dir });
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActive(next);
      setTransition(null);
    }, TRANSITION_MS);
  };

  const jump = (index: number) => {
    if (transition || index === active) return;
    const dir = index > active ? 1 : -1;
    setTransition({ from: active, to: index, dir });
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActive(index);
      setTransition(null);
    }, TRANSITION_MS);
  };

  const displayIndex = transition ? transition.to : active;
  const displayStat = stats[displayIndex];

  const onArrowKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); go(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); go(-1); }
  };

  return (
    <div className="stats-stage" data-reveal>
      <div className="stats-media">
        {stats.map((item, index) => {
          let layerClass = '';
          if (transition) {
            if (index === transition.from) layerClass = transition.dir > 0 ? 'is-leaving-next' : 'is-leaving-prev';
            else if (index === transition.to) layerClass = transition.dir > 0 ? 'is-entering-next' : 'is-entering-prev';
            else layerClass = 'is-hidden';
          } else {
            layerClass = index === active ? 'is-active' : 'is-hidden';
          }
          const src = failedImages[index] && item.image !== item.fallbackImage ? item.fallbackImage : item.image;
          return (
            <div key={item.image} className={`stats-visual ${layerClass}`} aria-hidden="true">
              <Image
                src={src}
                alt=""
                fill
                quality={72}
                priority={index === 0}
                sizes="(max-width: 760px) 100vw, 75vw"
                onError={() => setFailedImages((prev) => (prev[index] ? prev : { ...prev, [index]: true }))}
              />
            </div>
          );
        })}
      </div>
      <div className="stats-copy" key={displayIndex}>
        <span className="stats-copy-rule" aria-hidden="true" />
        <p className="stats-headline">{displayStat.headline}</p>
        <p className="stats-supporting">{displayStat.supporting}</p>
      </div>
      <div className="stats-footer">
        <div className="stats-controls">
          <button type="button" className="stats-arrow" data-dir="prev" onClick={() => go(-1)} onKeyDown={onArrowKeyDown} aria-label="Vorig feit">
            <span className="stats-arrow-icon stats-arrow-icon-a"><ArrowLeft /></span>
            <span className="stats-arrow-icon stats-arrow-icon-b"><ArrowLeft /></span>
          </button>
          <button type="button" className="stats-arrow" data-dir="next" onClick={() => go(1)} onKeyDown={onArrowKeyDown} aria-label="Volgend feit">
            <span className="stats-arrow-icon stats-arrow-icon-a"><ArrowRight /></span>
            <span className="stats-arrow-icon stats-arrow-icon-b"><ArrowRight /></span>
          </button>
        </div>
        <div className="stats-indicators">
          {stats.map((item, index) => (
            <button
              key={item.image}
              type="button"
              className={index === displayIndex ? 'is-active' : ''}
              aria-label={`Ga naar feit ${index + 1}`}
              aria-current={index === displayIndex}
              onClick={() => jump(index)}
            />
          ))}
        </div>
      </div>
      <p className="stats-source">Bron: Stanford Web Credibility Research, StatCounter en gepubliceerd onderzoek naar webdesign en conversie.</p>
    </div>
  );
}
