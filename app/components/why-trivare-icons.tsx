// Richer, multi-stage icon animations exclusively for the "Waarom
// Trivare" cards. Kept in their own file with their own CSS classes
// (wt-*) so none of this affects the Werkwijze icons in
// animated-icons.tsx, which share nothing with these.
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

// Gesprek — three lines appear one after another, like a reply being typed.
export function GesprekIcon() {
  return (
    <svg {...base}>
      <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
      <line className="wt-line wt-d0" x1="7.2" y1="10.2" x2="16.2" y2="10.2" />
      <line className="wt-line wt-d1" x1="7.2" y1="13" x2="15" y2="13" />
      <line className="wt-line wt-d2" x1="7.2" y1="15.8" x2="11.6" y2="15.8" />
    </svg>
  );
}

// Prijs — the checkmark draws itself in, then the frame lights up.
export function PrijsIcon() {
  return (
    <svg {...base}>
      <circle cx="12" cy="12" r="8.6" />
      <circle className="wt-ring-trace" cx="12" cy="12" r="8.6" />
      <path className="wt-check-draw" d="M8 12.3l2.6 2.6 5-5.6" />
    </svg>
  );
}

// Klok — the hand sweeps smoothly forward and settles precisely back.
export function KlokIcon() {
  return (
    <svg {...base}>
      <circle cx="12" cy="12" r="8.6" />
      <g className="wt-hand" style={{ transformOrigin: '12px 12px' }}>
        <path d="M12 6.4v5.9l4.3 2.1" />
      </g>
    </svg>
  );
}

// Ontwerp — the cursor arrives at its target, then the click activates.
export function OntwerpIcon() {
  return (
    <svg {...base}>
      <g className="wt-cursor-move">
        <path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z" />
      </g>
      <path className="wt-spark wt-d2" d="M14 4.1 12 6" />
      <path className="wt-spark wt-d3" d="m5.1 8-2.9-.8" />
      <path className="wt-spark wt-d2" d="m6 12-1.9 2" />
      <path className="wt-spark wt-d3" d="M7.2 2.2 8 5.1" />
    </svg>
  );
}

// Marketing — the bars build up one after another.
export function MarketingIcon() {
  return (
    <svg {...base}>
      <line x1="4" y1="19.4" x2="20" y2="19.4" />
      <line className="wt-bar wt-d0" x1="7.5" y1="19.4" x2="7.5" y2="14.6" />
      <line className="wt-bar wt-d1" x1="12" y1="19.4" x2="12" y2="10.2" />
      <line className="wt-bar wt-d2" x1="16.5" y1="19.4" x2="16.5" y2="6.6" />
    </svg>
  );
}

// Schermen — the outline traces itself, then the content warms in.
export function SchermenIcon() {
  return (
    <svg {...base}>
      <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8" />
      <path className="wt-outline-trace" d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8" />
      <rect className="wt-content-fill" x="3.2" y="5.2" width="12.6" height="8.7" rx="0.8" fill="currentColor" stroke="none" />
      <path d="M10 19v-3.96 3.15" />
      <path d="M7 19h5" />
      <rect width="6" height="10" x="16" y="12" rx="2" />
    </svg>
  );
}

// Code — the brackets ease open, then the code lines appear.
export function CodeIcon() {
  return (
    <svg {...base}>
      <path className="wt-bracket" style={{ ['--icon-peak' as string]: 'translateX(3px)' }} d="m16 18 6-6-6-6" />
      <path className="wt-bracket" style={{ ['--icon-peak' as string]: 'translateX(-3px)' }} d="m8 6-6 6 6 6" />
      <line className="wt-codeline" x1="10.3" y1="9.4" x2="13.7" y2="9.4" />
      <line className="wt-codeline" x1="10.3" y1="12" x2="12.5" y2="12" />
      <line className="wt-codeline" x1="10.3" y1="14.6" x2="13.3" y2="14.6" />
    </svg>
  );
}

// Ondersteuning — the signal marks brighten, then the dots appear in turn.
export function OndersteuningIcon() {
  return (
    <svg {...base}>
      <circle cx="12" cy="12" r="8.6" />
      <path className="wt-cross" d="m4.93 4.93 3.6 3.6" />
      <path className="wt-cross" d="m15.47 8.53 3.6-3.6" />
      <path className="wt-cross" d="m15.47 15.47 3.6 3.6" />
      <path className="wt-cross" d="m8.53 15.47-3.6 3.6" />
      <circle cx="12" cy="12" r="3.6" />
      <circle className="wt-dot wt-d1" cx="10.1" cy="12" r="0.8" fill="currentColor" stroke="none" />
      <circle className="wt-dot wt-d2" cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
      <circle className="wt-dot wt-d3" cx="13.9" cy="12" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}
