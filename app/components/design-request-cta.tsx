'use client';

import { lazy, Suspense, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const DesignRequestDialog = lazy(() => import('@/app/components/design-request-dialog'));

function DesignCtaIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <rect className="cta-icon-trace" width="20" height="14" x="2" y="3" rx="2" />
      <rect className="cta-icon-fill" x="3.4" y="4.4" width="17.2" height="11.2" rx="1" fill="currentColor" stroke="none" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
      <path className="cta-icon-cursor" d="M8.8 8.3l5.7 2.4-2.3.9 2.2 2.2-.9.9-2.2-2.2-.9 2.3z" />
    </svg>
  );
}

export function DesignRequestCta() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const openDialog = () => { setOpen(true); setLoaded(true); };

  return (
    <>
      <div className="design-cta-banner" data-reveal>
        <span className="design-cta-icon" aria-hidden="true"><DesignCtaIcon /></span>
        <div className="design-cta-copy">
          <h3>Twijfel je nog? Bekijk eerst een gratis ontwerp.</h3>
          <p>Vertel me over jouw bedrijf en wat je zoekt. Ik maak een eerste ontwerp voor je homepage, zodat je kunt zien welke uitstraling bij je past. Gratis en vrijblijvend. Bevalt de richting, dan bespreken we de verdere uitwerking.</p>
        </div>
        <button type="button" className="primary-cta cta-shine design-cta-button" onClick={openDialog}>
          <span>Vraag een gratis ontwerp aan</span>
          <ArrowUpRight className="design-cta-arrow" />
        </button>
      </div>

      {loaded && (
        <Suspense fallback={null}>
          <DesignRequestDialog open={open} onOpenChange={setOpen} />
        </Suspense>
      )}
    </>
  );
}
