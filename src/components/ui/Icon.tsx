export type IconName =
  | "book"
  | "branch"
  | "search"
  | "external"
  | "check"
  | "code"
  | "pr"
  | "merge"
  | "commit"
  | "stack"
  | "layers"
  | "tag"
  | "arrow-right"
  | "filter"
  | "sparkles"
  | "globe"
  | "terminal"
  | "cpu";

export function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };

  if (name === "book")
    return (
      <svg {...common}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
      </svg>
    );

  if (name === "branch")
    return (
      <svg {...common}>
        <circle cx="6" cy="4" r="2" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="6" cy="20" r="2" />
        <path d="M6 6v12M8 8c6 0 4-2 8-2" />
      </svg>
    );

  if (name === "pr")
    return (
      <svg {...common}>
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <path d="M13 6h3a2 2 0 0 1 2 2v7" />
        <line x1="6" y1="9" x2="6" y2="21" />
      </svg>
    );

  if (name === "merge")
    return (
      <svg {...common}>
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <path d="M6 9v12" />
        <path d="M18 15V9a3 3 0 0 0-3-3H6" />
      </svg>
    );

  if (name === "commit")
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4" />
        <line x1="1.05" y1="12" x2="8" y2="12" />
        <line x1="16" y1="12" x2="22.95" y2="12" />
      </svg>
    );

  if (name === "stack" || name === "layers")
    return (
      <svg {...common}>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    );

  if (name === "tag")
    return (
      <svg {...common}>
        <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
        <path d="M7 7h.01" />
      </svg>
    );

  if (name === "arrow-right")
    return (
      <svg {...common}>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    );

  if (name === "filter")
    return (
      <svg {...common}>
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
    );

  if (name === "sparkles")
    return (
      <svg {...common}>
        <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
      </svg>
    );

  if (name === "search")
    return (
      <svg {...common}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </svg>
    );

  if (name === "external")
    return (
      <svg {...common}>
        <path d="M15 3h6v6M10 14 21 3" />
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      </svg>
    );

  if (name === "check")
    return (
      <svg {...common}>
        <path d="m5 12 4 4L19 6" />
      </svg>
    );

  if (name === "globe")
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    );

  if (name === "terminal")
    return (
      <svg {...common}>
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    );

  if (name === "cpu")
    return (
      <svg {...common}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    );

  return (
    <svg {...common}>
      <path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />
    </svg>
  );
}

