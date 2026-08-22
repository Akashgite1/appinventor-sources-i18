type IconName = "book" | "branch" | "search" | "external" | "check" | "code";

export function Icon({ name }: { name: IconName }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
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
  return (
    <svg {...common}>
      <path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />
    </svg>
  );
}
