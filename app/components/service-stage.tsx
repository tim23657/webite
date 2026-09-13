'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { services } from '@/app/lib/site-data';

export function ServiceStage() {
  const [active, setActive] = useState(0);
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
      {services.map((service, index) => (
        <div className={`process-copy ${index === active ? 'is-active' : ''}`} key={service.number} aria-hidden={index !== active}>
          <h3>{service.title}</h3>
          <span>{service.text}</span>
        </div>
      ))}
      <div className="process-controls">
        <button type="button" onClick={() => go(-1)} aria-label="Vorige dienst"><ArrowLeft /></button>
        <button type="button" onClick={() => go(1)} aria-label="Volgende dienst"><ArrowRight /></button>
      </div>
      <div className="process-progress">
        <div><i style={{ width: `${((active + 1) / services.length) * 100}%` }} /></div>
      </div>
    </div>
  );
}
