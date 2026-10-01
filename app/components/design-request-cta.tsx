'use client';

import { lazy, Suspense, useState } from 'react';
import { ArrowUpRight, Monitor } from 'lucide-react';

const DesignRequestDialog = lazy(() => import('@/app/components/design-request-dialog'));

export function DesignRequestCta() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const openDialog = () => { setOpen(true); setLoaded(true); };

  return (
    <>
      <div className="design-cta-banner" data-reveal>
        <span className="design-cta-icon" aria-hidden="true"><Monitor strokeWidth={1.6} /></span>
        <div className="design-cta-copy">
          <h3>Twijfel je nog? Bekijk eerst een gratis ontwerp.</h3>
          <p>Vertel me over jouw bedrijf en wat je zoekt. Ik maak een eerste ontwerp voor je homepage, zodat je kunt zien welke uitstraling bij je past. Gratis en vrijblijvend. Bevalt de richting, dan bespreken we de verdere uitwerking.</p>
        </div>
        <button type="button" className="primary-cta cta-shine design-cta-button" onClick={openDialog}>
          <span>Vraag een gratis ontwerp aan</span>
          <ArrowUpRight />
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
