'use client';

import { SyntheticEvent, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function DesignRequestDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');

  const submit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Capture the form before the first await — event.currentTarget is only
    // valid during synchronous dispatch and reads back as null afterwards.
    const form = event.currentTarget;
    setFormState('sending'); setFormError('');
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const extra = data.website_instagram?.trim();
    const message = extra ? `${data.message}\n\nHuidige website of Instagram: ${extra}` : data.message;
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ website: data.website, name: data.name, company: data.company, email: data.email, service: 'Gratis ontwerp aanvraag', message }),
      });
      const result = await response.json() as { ok?: boolean; message?: string };
      if (!response.ok || !result.ok) throw new Error(result.message || 'Versturen is niet gelukt.');
      setFormState('success');
      form.reset();
    } catch (error) {
      setFormState('error');
      setFormError(error instanceof Error ? error.message : 'Versturen is niet gelukt.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="design-request-dialog">
        <DialogHeader>
          <p className="design-request-label">GRATIS EERSTE ONTWERP</p>
          <DialogTitle>Jouw website begint hier.</DialogTitle>
          <p className="design-request-intro">Vertel kort over je bedrijf en je wensen. Samen bespreken we welke uitstraling bij je past.</p>
        </DialogHeader>
        {formState === 'success' ? (
          <p className="design-request-success">Bedankt voor je aanvraag! Ik neem zo snel mogelijk contact met je op.</p>
        ) : (
          <form className="contact-form design-request-form" onSubmit={submit} noValidate>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp-field" aria-hidden="true" />
            <div className="design-request-row">
              <label htmlFor="dr-name"><span>Naam</span><Input id="dr-name" name="name" required autoComplete="name" placeholder="Jouw naam" /></label>
              <label htmlFor="dr-company"><span>Bedrijfsnaam</span><Input id="dr-company" name="company" required autoComplete="organization" placeholder="Naam van je bedrijf" /></label>
            </div>
            <label htmlFor="dr-email"><span>E-mailadres</span><Input id="dr-email" name="email" type="email" required autoComplete="email" placeholder="naam@bedrijf.nl" /></label>
            <label htmlFor="dr-web"><span>Huidige website of Instagram <small>(optioneel)</small></span><Input id="dr-web" name="website_instagram" placeholder="www.jouwbedrijf.nl" /></label>
            <label htmlFor="dr-message"><span>Wat zoek je voor jouw website?</span><Textarea id="dr-message" name="message" required minLength={10} rows={4} placeholder="Vertel kort wat je zoekt" /></label>
            <p className="design-request-note">Gratis en vrijblijvend. Je ontvangt een eerste homepageontwerp.</p>
            <Button className="submit-button" type="submit" disabled={formState === 'sending'}>
              <span>{formState === 'sending' ? 'Versturen...' : 'Vraag mijn gratis ontwerp aan'}</span>
              {formState === 'sending' ? <i className="mini-loader" /> : <ArrowUpRight />}
            </Button>
            <div className={`form-message ${formState}`} aria-live="polite">{formState === 'error' ? formError : ''}</div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
