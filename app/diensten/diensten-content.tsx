'use client';

import { SiteHeader } from '@/app/components/site-header';
import { SiteFooter } from '@/app/components/site-footer';
import { DienstenSection } from '@/app/components/diensten-section';

export function DienstenContent() {
  return (
    <main>
      <SiteHeader />
      <DienstenSection style={{ paddingTop: 'clamp(150px, 17vw, 220px)' }} />
      <SiteFooter />
    </main>
  );
}
