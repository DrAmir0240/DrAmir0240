import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  badge,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-white/[0.06] text-white border border-white/20 mb-3 shadow-sm shadow-white/5">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-sm shadow-white" />
          {badge}
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;
