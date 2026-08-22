import type { ReactNode } from "react";

export type StatusTone = "green" | "purple" | "blue" | "amber" | "gray" | "teal" | "orange";

export function Status({
  children,
  tone = "green",
  className = "",
}: {
  children: ReactNode;
  tone?: StatusTone;
  className?: string;
}) {
  return <span className={`status status-${tone} ${className}`.trim()}>{children}</span>;
}

