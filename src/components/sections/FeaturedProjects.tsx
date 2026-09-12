"use client";

import React from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

interface ProjectItem {
  slug: string;
  titleEn: string;
  titleFa: string;
  subtitleEn: string;
  subtitleFa: string;
  descriptionEn: string;
  descriptionFa: string;
  featured: boolean;
  status: string;
  techStack?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

interface FeaturedProjectsProps {
  projects?: ProjectItem[];
  locale: string;
  title: string;
  subtitle: string;
  labels: {
    viewDetails: string;
    sourceCode: string;
    liveDemo: string;
  };
}

export function FeaturedProjects({
  projects = [],
  locale,
  title,
  subtitle,
  labels,
}: FeaturedProjectsProps) {
  const isFa = locale === "fa";
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PRODUCTION":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {isFa ? "عملیاتی" : "Production"}
          </span>
        );
      case "DEMO_READY":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono bg-sky-500/10 text-sky-400 border border-sky-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            {isFa ? "دمو آماده" : "Demo"}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono bg-white/10 text-slate-300 border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            {isFa ? "درحال توسعه" : "Dev"}
          </span>
        );
    }
  };

  const safeProjects = projects || [];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
          <SectionHeader
            title={title}
            subtitle={subtitle}
            badge={isFa ? "پروژه‌های برگزیده" : "Featured Work"}
          />
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors pb-12"
          >
            <span>{isFa ? "مشاهده تمام سیستم‌ها" : "View All Systems"}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {safeProjects.map((proj) => {
            const projectTitle = isFa ? proj.titleFa : proj.titleEn;
            const projectSubtitle = isFa ? proj.subtitleFa : proj.subtitleEn;
            const projectDesc = isFa ? proj.descriptionFa : proj.descriptionEn;

            return (
              <GlassCard
                key={proj.slug}
                className="flex flex-col justify-between h-full !p-7 group"
                glow={proj.featured}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {getStatusBadge(proj.status)}
                    {proj.featured && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-white bg-white/10 border border-white/20 px-2 py-0.5 rounded-md shadow-sm">
                        <Sparkles className="w-3 h-3 text-white" />
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-slate-200 transition-colors">
                    {projectTitle}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mb-4 leading-relaxed">
                    {projectSubtitle}
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed line-clamp-4 mb-6 font-light">
                    {projectDesc}
                  </p>
                </div>

                <div>
                  {/* Tech stack badges */}
                  {proj.techStack && proj.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {proj.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300 group-hover:border-white/20 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                    <Link
                      href={`/${locale}/projects/${proj.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-slate-300 transition-colors"
                    >
                      <span>{labels.viewDetails}</span>
                      <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProjects;
