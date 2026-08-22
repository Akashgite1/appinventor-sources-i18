import type { ReactNode } from "react";

export function Status({
  children,
  tone = "green",
}: {
  children: ReactNode;
  tone?: "green" | "purple";
}) {
  return <span className={`status status-${tone}`}>{children}</span>;
}
