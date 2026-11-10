'use client';

import { SiteHeader } from '@/app/components/site-header';
import { SiteFooter } from '@/app/components/site-footer';
import { DienstenSection } from '@/app/components/diensten-section';
import { useReveal } from '@/app/components/use-reveal';

export function DienstenContent() {
  useReveal();

  return (
    <main>
      <SiteHeader />
      <DienstenSection style={{ paddingTop: 'clamp(150px, 17vw, 220px)' }} />
      <SiteFooter />
    </main>
  );
}
