import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Layers,
  FileText,
  Cpu,
  ExternalLink,
  User,
  Image as ImageIcon,
  Save,
} from "lucide-react";
import { getProjects, getArticles, getSkillCategories, getProfileData } from "@/lib/data";
import { GlassCard } from "@/components/ui/GlassCard";

export default async function AdminDashboardPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const [profile, projects, articles, categories] = await Promise.all([
    getProfileData(),
    getProjects(),
    getArticles(),
    getSkillCategories(),
  ]);

  const isFa = locale === "fa";

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">
            {isFa ? "داشبورد مدیریت محتوا (CMS)" : "CMS Admin Dashboard"}
          </h1>
          <p className="text-sm text-rose-300/80 mt-1">
            {isFa
              ? "مدیریت پروفایل، پروژه‌ها، گالری تصاویر و مقالات تخصصی"
              : "Direct overview and management of portfolio data, media, and profile"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}`}
            className="text-xs font-mono text-rose-300 px-3 py-1.5 rounded-xl border border-rose-500/30 hover:bg-rose-500/10 transition-colors"
          >
            {isFa ? "مشاهده سایت" : "View Live Site"}
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <GlassCard className="!p-6 flex items-center gap-4" glow>
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 shadow-sm shadow-rose-500/20">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{projects.length}</div>
            <div className="text-xs text-slate-400">
              {isFa ? "پروژه‌های مهندسی‌شده" : "Engineered Systems"}
            </div>
          </div>
        </GlassCard>

        <GlassCard className="!p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{articles.length}</div>
            <div className="text-xs text-slate-400">
              {isFa ? "مقالات و یادداشت‌ها" : "Published Articles"}
            </div>
          </div>
        </GlassCard>

        <GlassCard className="!p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{categories.length}</div>
            <div className="text-xs text-slate-400">
              {isFa ? "دسته‌بندی مهارت‌ها" : "Skill Categories"}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Profile & Avatar Manager Section */}
      <GlassCard className="!p-6 sm:!p-8 mb-10">
        <div className="flex items-center gap-2 mb-6">
          <User className="w-5 h-5 text-rose-500" />
          <h2 className="text-xl font-bold text-white">
            {isFa ? "تنظیمات پروفایل و عکس شخصی" : "Profile & Avatar Media Manager"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-3 flex flex-col items-center">
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-rose-500 shadow-lg shadow-rose-950/50 mb-3">
              <Image
                src={profile?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"}
                alt="Profile Avatar"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <span className="text-xs font-mono text-slate-400">
              {isFa ? "پیش‌نمایش تصویر" : "Active Avatar Preview"}
            </span>
          </div>

          <div className="md:col-span-9 space-y-4">
            <div>
              <label className="block text-xs font-mono text-rose-200 mb-1.5">
                {isFa ? "آدرس اینترنتی تصویر پروفایل (Avatar URL):" : "Avatar Image URL (HTTPS / Local Path):"}
              </label>
              <input
                type="text"
                defaultValue={profile?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"}
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-rose-500/25 text-white text-sm focus:outline-none focus:border-rose-500"
                placeholder="https://... or /images/my-avatar.jpg"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-rose-200 mb-1.5">
                  {isFa ? "نام (فارسی):" : "Full Name (FA):"}
                </label>
                <input
                  type="text"
                  defaultValue={profile?.fullNameFa || "امیرحسین امیدی"}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-rose-500/25 text-white text-sm focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-rose-200 mb-1.5">
                  {isFa ? "عنوان تخصصی (فارسی):" : "Title (FA):"}
                </label>
                <input
                  type="text"
                  defaultValue={profile?.titleFa || "مهندس ارشد بک‌اند و معمار سیستم‌های توزیع‌شده"}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-rose-500/25 text-white text-sm focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-lg shadow-rose-950/50 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>{isFa ? "ذخیره تغییرات پروفایل" : "Save Profile Settings"}</span>
              </button>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Projects & Articles Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Projects Table summary */}
        <GlassCard className="!p-6 sm:!p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-rose-500" />
              <span>{isFa ? "سامانه‌ها و پروژه‌ها (با گالری و لینک)" : "Projects (with Gallery & Live Links)"}</span>
            </h2>
          </div>

          <div className="space-y-3">
            {projects.map((proj) => (
              <div
                key={proj.slug}
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-rose-500/15"
              >
                <div>
                  <div className="font-semibold text-white text-sm">
                    {isFa ? proj.titleFa : proj.titleEn}
                  </div>
                  <div className="text-xs font-mono text-rose-400 flex items-center gap-2 mt-0.5">
                    <span>{proj.status}</span>
                    {proj.liveUrl && <span className="text-emerald-400">• Link active</span>}
                    {(proj as any).galleryImages?.length > 0 && (
                      <span className="text-slate-400 flex items-center gap-0.5">
                        <ImageIcon className="w-3 h-3 text-rose-400" />
                        {(proj as any).galleryImages.length}
                      </span>
                    )}
                  </div>
                </div>
                <Link
                  href={`/${locale}/projects/${proj.slug}`}
                  className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors"
                  title="View"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Articles Table summary */}
        <GlassCard className="!p-6 sm:!p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-400" />
              <span>{isFa ? "مقالات تخصصی" : "Published Articles"}</span>
            </h2>
          </div>

          <div className="space-y-3">
            {articles.map((article) => (
              <div
                key={article.slug}
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-rose-500/15"
              >
                <div>
                  <div className="font-semibold text-white text-sm">
                    {isFa ? article.titleFa : article.titleEn}
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    {article.readingTime || "5 min"}
                  </div>
                </div>
                <Link
                  href={`/${locale}/blog/${article.slug}`}
                  className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors"
                  title="View"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
