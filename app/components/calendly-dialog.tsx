'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CALENDLY_URL } from '@/app/lib/site-data';

export default function CalendlyDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="calendar-dialog">
        <DialogHeader><DialogTitle>Plan direct een afspraak</DialogTitle><DialogDescription>Kies via Calendly een moment dat voor jou goed uitkomt.</DialogDescription></DialogHeader>
        {CALENDLY_URL.startsWith('http') ? (
          <iframe title="Plan een afspraak via Calendly" src={CALENDLY_URL} />
        ) : (
          <div className="calendar-placeholder">
            <span>CALENDLY</span>
            <h3>De agenda wordt hier gekoppeld.</h3>
            <p>De integratie staat technisch klaar. Tot de definitieve link is ingevuld kun je mailen naar <a href="mailto:contact@trivare.nl">contact@trivare.nl</a>.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
