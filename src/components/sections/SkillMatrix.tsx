"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Database,
  Server,
  Cpu,
  Bot,
  Code,
  CheckCircle2,
} from "lucide-react";

interface SkillItem {
  name: string;
  level: string;
  proficiency: number;
}

interface SkillCategoryData {
  id: string;
  nameEn: string;
  nameFa: string;
  skills?: SkillItem[];
}

interface SkillMatrixProps {
  categories?: SkillCategoryData[];
  locale: string;
  title: string;
  subtitle: string;
}

export function SkillMatrix({
  categories = [],
  locale,
  title,
  subtitle,
}: SkillMatrixProps) {
  const [activeTab, setActiveTab] = useState(0);
  const isFa = locale === "fa";

  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Server className="w-4 h-4 text-white" />;
      case 1:
        return <Database className="w-4 h-4 text-slate-300" />;
      case 2:
        return <Cpu className="w-4 h-4 text-slate-300" />;
      case 3:
        return <Bot className="w-4 h-4 text-white" />;
      default:
        return <Code className="w-4 h-4 text-slate-300" />;
    }
  };

  const safeCategories = categories || [];
  const currentCategory = safeCategories[activeTab] || safeCategories[0];
  const currentSkills = currentCategory?.skills || [];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          badge={isFa ? "توانمندی‌های فنی" : "Technical Matrix"}
        />

        {/* Categories Tab Navigation */}
        {safeCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-10">
            {safeCategories.map((cat, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={cat.id || idx}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 border ${
                    isActive
                      ? "bg-white/20 text-white border-white/40 shadow-lg shadow-black/40 font-semibold"
                      : "bg-white/[0.03] text-slate-400 border-white/[0.08] hover:text-white hover:bg-white/[0.08] hover:border-white/20"
                  }`}
                >
                  {getCategoryIcon(idx)}
                  <span>{isFa ? cat.nameFa : cat.nameEn}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Skills Grid for Active Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentSkills.map((skill) => (
            <GlassCard key={skill.name} className="!p-6" glow={skill.proficiency >= 95}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span className="font-bold text-white text-base tracking-tight">
                    {skill.name}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-slate-300">
                  {skill.proficiency}%
                </span>
              </div>

              {/* Proficiency Progress Bar with Crisp White Glow */}
              <div className="w-full bg-slate-900/80 rounded-full h-2 overflow-hidden mb-3 border border-white/10">
                <div
                  className="bg-gradient-to-r from-white via-slate-200 to-slate-400 h-2 rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(255,255,255,0.6)]"
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{isFa ? "سطح تسلط:" : "Proficiency:"}</span>
                <span className="font-mono text-white font-medium">
                  {skill.level}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillMatrix;
