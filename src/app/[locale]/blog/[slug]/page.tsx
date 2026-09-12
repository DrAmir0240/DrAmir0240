import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import { getArticleBySlug } from "@/lib/data";
import { GlassCard } from "@/components/ui/GlassCard";
import { TechBadge } from "@/components/ui/TechBadge";

export default async function ArticleDetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const isFa = locale === "fa";
  const ArrowBackIcon = isFa ? ArrowRight : ArrowLeft;

  const title = isFa ? article.titleFa : article.titleEn;
  const summary = isFa ? article.summaryFa : article.summaryEn;
  const content = isFa ? article.contentFa : article.contentEn;

  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link
        href={`/${locale}/blog`}
        className="inline-flex items-center gap-2 text-sm text-rose-500 hover:text-rose-400 font-medium mb-8 transition-colors drop-shadow-[0_0_6px_rgba(255,0,85,0.4)]"
      >
        <ArrowBackIcon className="w-4 h-4" />
        <span>{isFa ? "بازگشت به مقالات" : "Back to Articles"}</span>
      </Link>

      <article>
        <GlassCard className="!p-8 sm:!p-12 mb-10" glow>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mb-6">
            <span className="flex items-center gap-1.5 text-rose-400 font-bold">
              <Clock className="w-4 h-4" />
              {article.readingTime || "6 min read"}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              {new Date(article.createdAt).toLocaleDateString(
                isFa ? "fa-IR" : "en-US"
              )}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white mb-6 leading-tight">
            {title}
          </h1>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-rose-500/20 text-rose-200 text-sm sm:text-base leading-relaxed mb-8">
            {summary}
          </div>

          <div className="flex flex-wrap gap-2 mb-10 pb-8 border-b border-white/[0.08]">
            {article.tags.map((tag) => (
              <TechBadge key={tag} label={tag} variant="rose" />
            ))}
          </div>

          {/* Rendered content */}
          <div className="text-slate-200 text-base sm:text-lg leading-relaxed whitespace-pre-line space-y-4 font-normal">
            {content}
          </div>
        </GlassCard>
      </article>
    </div>
  );
}
