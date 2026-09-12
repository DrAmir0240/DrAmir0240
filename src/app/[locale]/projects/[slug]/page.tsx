import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Cpu, ExternalLink, Image as ImageIcon } from "lucide-react";
import { getProjectBySlug } from "@/lib/data";
import { GlassCard } from "@/components/ui/GlassCard";
import { TechBadge } from "@/components/ui/TechBadge";

export default async function ProjectDetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const isFa = locale === "fa";
  const ArrowBackIcon = isFa ? ArrowRight : ArrowLeft;

  const title = isFa ? project.titleFa : project.titleEn;
  const subtitle = isFa ? project.subtitleFa : project.subtitleEn;
  const desc = isFa ? project.descriptionFa : project.descriptionEn;
  const arch = isFa ? project.architectureFa : project.architectureEn;
  const liveUrl = project.liveUrl;
  const gallery = (project as any).galleryImages || [];

  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link
        href={`/${locale}/projects`}
        className="inline-flex items-center gap-2 text-sm text-rose-500 hover:text-rose-400 font-medium mb-8 transition-colors drop-shadow-[0_0_6px_rgba(255,0,85,0.4)]"
      >
        <ArrowBackIcon className="w-4 h-4" />
        <span>{isFa ? "بازگشت به فهرست پروژه‌ها" : "Back to Projects"}</span>
      </Link>

      <GlassCard className="!p-8 sm:!p-12 mb-10" glow>
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 shadow-sm shadow-rose-500/15">
            <Cpu className="w-3.5 h-3.5 text-rose-500" />
            {project.status}
          </span>

          {/* Conditional Live Project Button */}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-lg shadow-rose-950/50 transition-all hover:scale-105"
            >
              <span>{isFa ? "مشاهده سامانه آنلاین" : "Launch Project"}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
          {title}
        </h1>
        <p className="text-base sm:text-lg font-mono text-rose-300 mb-8">
          {subtitle}
        </p>

        {/* Image Gallery Section */}
        {gallery && gallery.length > 0 && (
          <div className="border-t border-white/[0.08] pt-8 mb-8">
            <div className="flex items-center gap-2 text-lg font-bold text-white mb-4">
              <ImageIcon className="w-5 h-5 text-rose-500" />
              <span>{isFa ? "گالری تصاویر و رابط کاربری" : "Screenshots & Architecture Gallery"}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {gallery.map((imgUrl: string, idx: number) => (
                <div
                  key={idx}
                  className="relative h-56 rounded-2xl overflow-hidden border border-rose-500/30 bg-black/40 group"
                >
                  <Image
                    src={imgUrl}
                    alt={`${title} screenshot ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs font-mono text-rose-200">View image {idx + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-white/[0.08] pt-8 mb-8">
          <h2 className="text-lg font-bold text-white mb-4">
            {isFa ? "شرح مسئله و پیاده‌سازی" : "Overview & Business Context"}
          </h2>
          <p className="text-slate-300 text-base leading-relaxed whitespace-pre-line">
            {desc}
          </p>
        </div>

        {arch && (
          <div className="border-t border-white/[0.08] pt-8 mb-8">
            <h2 className="text-lg font-bold text-white mb-4">
              {isFa ? "معماری فنی و پایگاه داده" : "Technical Architecture & Data Modeling"}
            </h2>
            <div className="p-6 rounded-2xl bg-black/40 border border-rose-500/20 text-slate-300 text-sm sm:text-base leading-relaxed">
              {arch}
            </div>
          </div>
        )}

        <div className="border-t border-white/[0.08] pt-8">
          <h2 className="text-lg font-bold text-white mb-4">
            {isFa ? "پشته نرم‌افزاری و زیرساخت" : "Technologies & Infrastructure"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <TechBadge key={tech} label={tech} variant="red" />
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
