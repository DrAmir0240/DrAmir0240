import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Cpu } from "lucide-react";
import { getProjects } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { TechBadge } from "@/components/ui/TechBadge";

export const metadata = {
  title: "Engineered Systems & Projects | Amirhossein Omidi",
  description: "Enterprise ERP systems, distributed pipelines, and telemetry platforms architected by Amirhossein Omidi.",
};

export default async function ProjectsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const projects = await getProjects();
  const isFa = locale === "fa";
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        title={isFa ? "کلیه سیستم‌ها و پروژه‌ها" : "Engineered Systems & Platforms"}
        subtitle={
          isFa
            ? "مرور معماری زیرساخت‌ها، ماژول‌های ERP و سیستم‌های رویدادمحور توسعه‌یافته"
            : "Complete architectural breakdown of enterprise suites, microservices, and distributed streaming engines."
        }
        badge={isFa ? "آرشیو پروژه‌ها" : "System Index"}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((proj) => {
          const title = isFa ? proj.titleFa : proj.titleEn;
          const subtitle = isFa ? proj.subtitleFa : proj.subtitleEn;
          const desc = isFa ? proj.descriptionFa : proj.descriptionEn;
          const arch = isFa ? proj.architectureFa : proj.architectureEn;

          return (
            <GlassCard key={proj.slug} className="flex flex-col justify-between !p-8" glow={proj.featured}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 shadow-sm shadow-rose-500/15">
                    <Cpu className="w-3.5 h-3.5 text-rose-500" />
                    {proj.status}
                  </span>
                  {proj.featured && (
                    <span className="text-xs font-mono text-rose-300">★ Featured Core</span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {title}
                </h3>
                <p className="text-sm font-mono text-rose-300/80 mb-4">
                  {subtitle}
                </p>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  {desc}
                </p>

                {arch && (
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-rose-500/15 mb-6">
                    <div className="text-xs font-mono text-rose-300 mb-1">
                      {isFa ? "خلاصه معماری سیستم:" : "System Architecture:"}
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed">
                      {arch}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {proj.techStack.map((tech) => (
                    <TechBadge key={tech} label={tech} />
                  ))}
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <Link
                    href={`/${locale}/projects/${proj.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-rose-500 hover:text-rose-400 transition-colors drop-shadow-[0_0_6px_rgba(255,0,85,0.4)]"
                  >
                    <span>{isFa ? "مشاهده جزئیات کامل" : "Deep Architecture View"}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
