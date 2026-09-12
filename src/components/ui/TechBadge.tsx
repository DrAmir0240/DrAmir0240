import React from "react";

interface TechBadgeProps {
  label: string;
  variant?: "red" | "rose" | "slate" | "emerald";
}

export function TechBadge({ label, variant = "slate" }: TechBadgeProps) {
  const styles = {
    red: "bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-sm shadow-rose-500/10",
    rose: "bg-red-500/10 text-red-400 border-red-500/30",
    slate: "bg-slate-800/40 text-slate-300 border-white/[0.08]",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mono font-medium border backdrop-blur-md transition-colors hover:border-rose-500/50 ${styles[variant]}`}
    >
      {label}
    </span>
  );
}

export default TechBadge;
