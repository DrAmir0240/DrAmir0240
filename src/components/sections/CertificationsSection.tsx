"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Award, CheckCircle } from "lucide-react";

interface CertificationItem {
  id: string;
  titleEn: string;
  titleFa: string;
  issuerEn: string;
  issuerFa: string;
  year: string;
  credentialUrl?: string;
}

interface CertificationsSectionProps {
  certifications?: CertificationItem[];
  locale: string;
  title: string;
  subtitle: string;
}

export function CertificationsSection({
  certifications = [],
  locale,
  title,
  subtitle,
}: CertificationsSectionProps) {
  const isFa = locale === "fa";
  const safeCerts = certifications || [];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          badge={isFa ? "مدارک و مدارج" : "Credentials"}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {safeCerts.map((cert) => {
            const certTitle = isFa ? cert.titleFa : cert.titleEn;
            const certIssuer = isFa ? cert.issuerFa : cert.issuerEn;

            return (
              <GlassCard key={cert.id} className="!p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/20 flex items-center justify-center mb-4 shadow-sm shadow-black/40">
                    <Award className="w-5 h-5 text-white" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 leading-snug">
                    {certTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mb-4">
                    {certIssuer}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-300 font-semibold">
                    {cert.year}
                  </span>
                  <span className="inline-flex items-center gap-1 text-white font-mono">
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                    Verified
                  </span>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CertificationsSection;
