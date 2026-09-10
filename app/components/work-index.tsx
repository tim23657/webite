'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/app/lib/site-data';

export function WorkIndex({ active, onHover, onOpen }: { active: number; onHover: (index: number) => void; onOpen: (index: number) => void }) {
  const activeProject = projects[active];
  return (
    <div className="work-index" data-reveal>
      <div className="work-index-list">
        {projects.map((project, index) => (
          <button
            key={project.slug}
            className={`work-index-row ${index === active ? 'is-active' : ''}`}
            onMouseEnter={() => onHover(index)}
            onFocus={() => onHover(index)}
            onClick={() => onOpen(index)}
          >
            <span className="work-index-title">{project.title}</span>
            <span className="work-index-label">{project.label}</span>
          </button>
        ))}
      </div>
      <div className="work-index-preview">
        <span className="work-index-eyebrow">CASE {activeProject.number}</span>
        <Image key={activeProject.slug} src={`/projects/${activeProject.slug}.jpg`} alt="" fill quality={68} sizes="(max-width: 900px) 100vw, 66vw" />
        <div className="work-index-preview-caption">
          <strong>{activeProject.title}</strong>
          <p>{activeProject.description}</p>
          <button type="button" onClick={() => onOpen(active)}>Bekijk case <ArrowUpRight /></button>
        </div>
      </div>
    </div>
  );
}
