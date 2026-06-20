type LifeIconName = "honey" | "travel" | "food" | "plants" | "tennis";

export function LifeIcon({ name }: { name: LifeIconName }) {
  const props = {
    width: 30,
    height: 30,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "honey":
      return (
        <svg {...props}>
          <path d="M12 3c3 3.6 5 6.2 5 9a5 5 0 0 1-10 0c0-2.8 2-5.4 5-9z" />
          <path d="M9.5 13.5h5" />
          <path d="M9.8 16.2h4.4" />
        </svg>
      );
    case "travel":
      return (
        <svg {...props}>
          <path d="M3.5 14.5l17-6.2c.9-.3 1.6.7 1 1.4L12 20l-1.6-4.4L3.5 14.5z" />
          <path d="M10.4 15.6l3.2-3.2" />
        </svg>
      );
    case "food":
      return (
        <svg {...props}>
          <path d="M3.5 11h17a8.5 8.5 0 0 1-8.5 8 8.5 8.5 0 0 1-8.5-8z" />
          <path d="M12 11V7" />
          <path d="M12 5.2c1.1 0 1.1-1.7 0-1.7" />
          <path d="M19 21H5" />
        </svg>
      );
    case "plants":
      return (
        <svg {...props}>
          <path d="M12 21v-8" />
          <path d="M12 13c0-4 3-7 8-7 0 4-3 7-8 7z" />
          <path d="M12 15c0-3-2.5-5.5-7-5.5 0 3 2.5 5.5 7 5.5z" />
        </svg>
      );
    case "tennis":
      return (
        <svg {...props}>
          {/* Racket head */}
          <ellipse cx="12" cy="8" rx="5" ry="6" />
          {/* Vertical strings */}
          <line x1="9.5" y1="3" x2="9.5" y2="13" />
          <line x1="12" y1="2.5" x2="12" y2="13.5" />
          <line x1="14.5" y1="3" x2="14.5" y2="13" />
          {/* Horizontal strings */}
          <line x1="7.5" y1="5.5" x2="16.5" y2="5.5" />
          <line x1="7" y1="8" x2="17" y2="8" />
          <line x1="7.5" y1="10.5" x2="16.5" y2="10.5" />
          {/* Handle */}
          <line x1="12" y1="14" x2="12" y2="21.5" />
        </svg>
      );
  }
}
