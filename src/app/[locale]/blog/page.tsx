import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Clock } from "lucide-react";
import { getArticles } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { TechBadge } from "@/components/ui/TechBadge";

export const metadata = {
  title: "Architecture Insights & Articles | Amirhossein Omidi",
  description: "Technical articles on distributed microservices, FastAPI, and Model Context Protocol (MCP) by Amirhossein Omidi.",
};

export default async function BlogPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const articles = await getArticles();
  const isFa = locale === "fa";
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        title={isFa ? "یادداشت‌ها و مقالات تخصصی" : "Engineering Insights & Articles"}
        subtitle={
          isFa
            ? "بررسی‌های عمیق پیرامون معماری سیستم‌های توزیع‌شده، پایتون و پروتکل‌های هوش مصنوعی"
            : "Deep dives into asynchronous event queues, microservices, database isolation, and AI agent protocols."
        }
        badge={isFa ? "نشریه فنی" : "Architecture Blog"}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((article) => {
          const title = isFa ? article.titleFa : article.titleEn;
          const summary = isFa ? article.summaryFa : article.summaryEn;

          return (
            <GlassCard key={article.slug} className="flex flex-col justify-between !p-8">
              <div>
                <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mb-4">
                  <span className="flex items-center gap-1 text-rose-400 font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readingTime || "5 min read"}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 hover:text-rose-400 transition-colors">
                  <Link href={`/${locale}/blog/${article.slug}`}>{title}</Link>
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  {summary}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {article.tags.map((tag) => (
                    <TechBadge key={tag} label={tag} variant="rose" />
                  ))}
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <Link
                    href={`/${locale}/blog/${article.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-rose-500 hover:text-rose-400 transition-colors drop-shadow-[0_0_6px_rgba(255,0,85,0.4)]"
                  >
                    <span>{isFa ? "مطالعه کامل مقاله" : "Read Article"}</span>
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
