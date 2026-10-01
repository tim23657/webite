// Hand-built equivalents of the existing lucide icons (same path data, so
// they read identically at rest) with specific sub-parts broken out and
// classed so individual pieces — not the whole glyph — can be animated on
// card hover. The three Werkwijze icons (Design/Hammer/Rocket) are new,
// added because that section had none before.
const base = {
  width: '100%',
  height: '100%',
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true as const,
};

// Gesprek — used for "Persoonlijk contact met mij" and "Jouw wensen
// bespreken". Two short lines inside the bubble appear just after
// each other on hover (the original icon has no interior lines).
export function ConversationIcon() {
  return (
    <svg {...base}>
      <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
      <line className="icon-reveal" x1="7.2" y1="11.6" x2="15.4" y2="11.6" />
      <line className="icon-reveal delay-1" x1="7.2" y1="14.8" x2="12.3" y2="14.8" />
    </svg>
  );
}

// Prijsafspraak — the handshake's small existing hook path is traced in
// like a checkmark on hover.
export function AgreementIcon() {
  return (
    <svg {...base}>
      <path className="icon-draw" d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </svg>
  );
}

// Klok — the hand nudges forward a little and eases back.
export function ClockIcon() {
  return (
    <svg {...base}>
      <circle cx="12" cy="12" r="9.2" />
      <g className="icon-nudge" style={{ transformOrigin: '12px 12px', ['--icon-peak' as string]: 'rotate(24deg)' }}>
        <path d="M12 6v6l4 2" />
      </g>
    </svg>
  );
}

// Ontwerp dat voor je werkt — the cursor's existing small "click" ticks
// fade/pop in together as the accent.
export function ClickAccentIcon() {
  return (
    <svg {...base}>
      <path className="icon-reveal" d="M14 4.1 12 6" />
      <path className="icon-reveal" d="m5.1 8-2.9-.8" />
      <path className="icon-reveal" d="m6 12-1.9 2" />
      <path className="icon-reveal" d="M7.2 2.2 8 5.1" />
      <path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z" />
    </svg>
  );
}

// Marketing als basis — the three rings pop in from the centre outward.
export function BuildRingsIcon() {
  return (
    <svg {...base}>
      <circle className="icon-pop delay-2" cx="12" cy="12" r="9.2" />
      <circle className="icon-pop delay-1" cx="12" cy="12" r="6" />
      <circle className="icon-pop" cx="12" cy="12" r="2" />
    </svg>
  );
}

// Sterk op ieder scherm — the screen area warms with a soft gold fill.
export function ScreenIcon() {
  return (
    <svg {...base}>
      <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8" />
      <rect className="icon-reveal-fade" x="3.2" y="5.2" width="12.6" height="8.7" rx="0.8" fill="currentColor" stroke="none" />
      <path d="M10 19v-3.96 3.15" />
      <path d="M7 19h5" />
      <rect width="6" height="10" x="16" y="12" rx="2" />
    </svg>
  );
}

// De techniek die bij jou past — the two brackets nudge apart and back.
export function CodeIcon() {
  return (
    <svg {...base}>
      <path className="icon-nudge" style={{ ['--icon-peak' as string]: 'translateX(2px)' }} d="m16 18 6-6-6-6" />
      <path className="icon-nudge" style={{ ['--icon-peak' as string]: 'translateX(-2px)' }} d="m8 6-6 6 6 6" />
    </svg>
  );
}

// Ook na de lancering bereikbaar — three small dots appear one after
// another inside the ring, like a quiet "still here" signal.
export function SupportIcon() {
  return (
    <svg {...base}>
      <circle cx="12" cy="12" r="9.2" />
      <path d="m4.93 4.93 3.9 3.9" />
      <path d="m15.17 8.83 3.9-3.9" />
      <path d="m15.17 15.17 3.9 3.9" />
      <path d="m8.83 15.17-3.9 3.9" />
      <circle cx="12" cy="12" r="3.6" />
      <circle className="icon-reveal" cx="10.1" cy="12" r="0.85" fill="currentColor" stroke="none" />
      <circle className="icon-reveal delay-1" cx="12" cy="12" r="0.85" fill="currentColor" stroke="none" />
      <circle className="icon-reveal delay-2" cx="13.9" cy="12" r="0.85" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Ontwerp en vaste prijs — the pen's existing tip node pops into view.
export function DesignIcon() {
  return (
    <svg {...base}>
      <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z" />
      <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18" />
      <path d="m2.3 2.3 7.286 7.286" />
      <circle className="icon-reveal" cx="11" cy="11" r="1.7" />
    </svg>
  );
}

// Bouwen en afstemmen — the hammer's existing small motion tick fades in.
export function HammerIcon() {
  return (
    <svg {...base}>
      <path d="m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9" />
      <path className="icon-reveal" d="m18 15 4-4" />
      <path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5" />
    </svg>
  );
}

// Controleren en live — the exhaust flame settles into view, like ignition.
export function RocketIcon() {
  return (
    <svg {...base}>
      <path className="icon-reveal-up" d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09" />
      <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" />
    </svg>
  );
}
