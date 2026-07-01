import type { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  /** Adds hover lift + gold glow. */
  interactive?: boolean;
};

export function GlassCard({
  children,
  className = "",
  interactive = false,
}: GlassCardProps) {
  return (
    <div
      className={`glass rounded-2xl ${
        interactive ? "glass-interactive" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
