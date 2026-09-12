'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'trivare-cookie-consent';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted');
    } catch {
      // localStorage unavailable — banner simply won't persist across reloads
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" aria-live="polite" aria-label="Cookiemelding">
      <p>
        Deze website gebruikt alleen functionele cookies die nodig zijn om de site goed te laten werken. Geen tracking- of marketingcookies.
        {' '}<Link href="/privacybeleid">Meer weten</Link>
      </p>
      <button type="button" onClick={dismiss}>Begrepen</button>
    </div>
  );
}
