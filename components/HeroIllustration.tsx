export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 400 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[80%] max-w-[340px]"
      aria-hidden="true"
    >
      {/* Ambient glow */}
      <ellipse
        cx="200"
        cy="260"
        rx="170"
        ry="210"
        fill="url(#heroGlow)"
      />

      {/* Concentric arcs — editorial, abstract */}
      <circle
        cx="200"
        cy="240"
        r="140"
        stroke="var(--border)"
        strokeWidth="1"
        strokeDasharray="3 8"
      />
      <circle
        cx="200"
        cy="240"
        r="100"
        stroke="var(--accent)"
        strokeWidth="0.75"
        opacity="0.35"
      />

      {/* Continuous stroke monogram echo — AB flowing form */}
      <path
        d="M120 380 C120 280 155 200 200 160 C245 200 280 280 280 380"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M155 320 L200 220 L245 320"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1="168"
        y1="290"
        x2="232"
        y2="290"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Vertical spine — systems metaphor */}
      <line
        x1="200"
        y1="100"
        x2="200"
        y2="420"
        stroke="var(--border)"
        strokeWidth="1"
      />

      {/* Node points */}
      <circle cx="200" cy="160" r="4" fill="var(--accent)" />
      <circle cx="200" cy="240" r="3" fill="var(--accent)" opacity="0.6" />
      <circle cx="200" cy="320" r="4" fill="var(--accent)" opacity="0.8" />

      {/* Floating marks */}
      <rect
        x="72"
        y="140"
        width="10"
        height="10"
        rx="1"
        stroke="var(--accent)"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
      <line
        x1="310"
        y1="180"
        x2="322"
        y2="192"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <line
        x1="322"
        y1="180"
        x2="310"
        y2="192"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <circle cx="318" cy="380" r="5" fill="var(--accent)" opacity="0.25" />
      <circle cx="82" cy="400" r="3" fill="var(--accent)" opacity="0.4" />

      <defs>
        <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
