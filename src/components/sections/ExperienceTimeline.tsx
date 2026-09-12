"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";

interface ExperienceItem {
  id: string;
  roleEn: string;
  roleFa: string;
  companyEn: string;
  companyFa: string;
  periodEn: string;
  periodFa: string;
  summaryEn: string;
  summaryFa: string;
  achievements?: string[];
  technologies?: string[];
  isCurrent: boolean;
}

interface ExperienceTimelineProps {
  experiences?: ExperienceItem[];
  locale: string;
  title: string;
  subtitle: string;
}

export function ExperienceTimeline({
  experiences = [],
  locale,
  title,
  subtitle,
}: ExperienceTimelineProps) {
  const isFa = locale === "fa";

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          badge={isFa ? "مسیر شغلی" : "Career Trajectory"}
        />

        <div className="relative border-s border-white/20 ms-4 md:ms-8 space-y-12">
          {(experiences || []).map((exp) => {
            const company = isFa ? exp.companyFa : exp.companyEn;
            const role = isFa ? exp.roleFa : exp.roleEn;
            const period = isFa ? exp.periodFa : exp.periodEn;
            const summary = isFa ? exp.summaryFa : exp.summaryEn;

            return (
              <div key={exp.id} className="relative ps-6 md:ps-10">
                {/* Timeline node icon with crisp white border */}
                <div className="absolute -start-[17px] top-1.5 w-8 h-8 rounded-full bg-[#070405] border-2 border-white flex items-center justify-center shadow-lg shadow-black/50">
                  <Briefcase className="w-3.5 h-3.5 text-white" />
                </div>

                <GlassCard className="!p-6 sm:!p-8" glow={exp.isCurrent}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {role}
                      </h3>
                      <div className="text-sm font-semibold text-slate-300 mt-0.5">
                        {company}
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/20 text-xs font-mono text-white w-fit">
                      <Calendar className="w-3.5 h-3.5 text-slate-300" />
                      <span>{period}</span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-light">
                    {summary}
                  </p>

                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="space-y-2 border-t border-white/[0.08] pt-4">
                      {exp.achievements.map((ach, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-6">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </GlassCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ExperienceTimeline;
