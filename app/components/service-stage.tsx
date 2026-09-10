'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { services } from '@/app/lib/site-data';

export function ServiceStage() {
  const [active, setActive] = useState(0);
  const activeService = services[active];
  const go = (dir: number) => setActive((prev) => (prev + dir + services.length) % services.length);

  return (
    <div className="process-stage" data-reveal>
      {services.map((service, index) => (
        <Image
          key={service.number}
          src={service.image}
          alt=""
          fill
          quality={68}
          priority={index === 0}
          className={index === active ? 'is-active' : ''}
          sizes="(max-width: 900px) 100vw, 1200px"
        />
      ))}
      <div className="process-shade" />
      <div className="process-copy" key={activeService.number}>
        <p><span>{activeService.number}</span>DIENST</p>
        <h3>{activeService.title}</h3>
        <span>{activeService.text}</span>
      </div>
      <div className="process-controls">
        <button type="button" onClick={() => go(-1)} aria-label="Vorige dienst"><ArrowLeft /></button>
        <button type="button" onClick={() => go(1)} aria-label="Volgende dienst"><ArrowRight /></button>
      </div>
      <div className="process-progress">
        <span>{String(active + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}</span>
        <div><i style={{ width: `${((active + 1) / services.length) * 100}%` }} /></div>
      </div>
    </div>
  );
}
