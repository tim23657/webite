'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { projects } from '@/app/lib/site-data';

export default function CaseDialog({ caseIndex, onClose }: { caseIndex: number | null; onClose: () => void }) {
  const selectedCase = caseIndex === null ? null : projects[caseIndex];

  return (
    <Dialog open={caseIndex !== null} onOpenChange={(open) => !open && onClose()}>
      {selectedCase && (
        <DialogContent className="case-dialog">
          <DialogHeader><DialogTitle>{selectedCase.title}</DialogTitle><DialogDescription>{selectedCase.label}</DialogDescription></DialogHeader>
          <div className="case-visual"><Image src={`/projects/${selectedCase.slug}.jpg`} alt="" fill sizes="90vw" /></div>
          <div className="case-detail-grid">
            <div><span>PROBLEEM</span><p>{selectedCase.problem}</p></div>
            <div><span>AANPAK</span><p>{selectedCase.approach}</p></div>
            <div><span>UITVOERING</span><p>{selectedCase.execution}</p></div>
            <div><span>RESULTAAT</span><p>{selectedCase.result}</p></div>
          </div>
          <div className="case-proof">{selectedCase.proof.map((item) => <span key={item}>{item}</span>)}</div>
          <Link className="primary-cta" href="/contact" onClick={onClose}><span>Bespreek jouw project</span><span className="cta-arrow"><ArrowUpRight /></span></Link>
        </DialogContent>
      )}
    </Dialog>
  );
}
