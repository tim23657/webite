// Hand-built equivalents of the existing lucide icons (same path data, so
// they read identically at rest) with specific sub-parts broken out and
// classed so individual pieces — not the whole glyph — can be animated on
// card hover. Used only by the Werkwijze cards (process-grid.tsx); the
// Waarom Trivare cards have their own richer set in why-trivare-icons.tsx.
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

// Gesprek — the whole bubble bounces once, with its two lines appearing
// just after each other.
export function ConversationIcon() {
  return (
    <svg {...base}>
      <g className="icon-bounce">
        <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
        <line className="icon-reveal" x1="7.2" y1="11.6" x2="15.4" y2="11.6" />
        <line className="icon-reveal delay-1" x1="7.2" y1="14.8" x2="12.3" y2="14.8" />
      </g>
    </svg>
  );
}

// Ontwerp en vaste prijs — the tip settles with a small stroke, then
// a dot of ink appears right at the nib.
export function DesignIcon() {
  return (
    <svg {...base}>
      <g className="icon-write" style={{ transformOrigin: '18px 18px' }}>
        <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z" />
      </g>
      <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18" />
      <path d="m2.3 2.3 7.286 7.286" />
      <ellipse className="icon-ink" cx="14" cy="21.1" rx="1.2" ry="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Bouwen en afstemmen — the head taps down three times.
export function HammerIcon() {
  return (
    <svg {...base}>
      <path d="m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9" />
      <g className="icon-tap" style={{ transformOrigin: '17px 10px' }}>
        <path className="icon-reveal delay-xs" d="m18 15 4-4" />
        <path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5" />
      </g>
    </svg>
  );
}

// Controleren en live — the fire ignites first, then the body lifts off.
export function RocketIcon() {
  return (
    <svg {...base}>
      <g className="icon-rise">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09" />
        <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" />
      </g>
      <path className="icon-flame" d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      <ellipse className="icon-flame-core" cx="12.9" cy="18" rx="1" ry="1.7" fill="currentColor" stroke="none" />
    </svg>
  );
}
