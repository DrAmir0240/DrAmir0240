import React from "react";
import { getTranslations } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { SkillMatrix } from "@/components/sections/SkillMatrix";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import {
  getProfileData,
  getSkillCategories,
  getProjects,
  getExperiences,
  getCertifications,
} from "@/lib/data";

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale });

  // Load master data with dynamic profile
  const [profile, categories, projects, experiences, certifications] = await Promise.all([
    getProfileData(),
    getSkillCategories(),
    getProjects(),
    getExperiences(),
    getCertifications(),
  ]);

  const featured = projects.filter((p) => p.featured);

  return (
    <div className="flex flex-col">
      <HeroSection
        locale={locale}
        profile={profile as any}
        t={{
          role: t("hero.role"),
          tagline: t("hero.tagline"),
          ctaProjects: t("hero.ctaProjects"),
          ctaContact: t("hero.ctaContact"),
          statsExp: t("hero.statsExp"),
          statsProjects: t("hero.statsProjects"),
          statsUptime: t("hero.statsUptime"),
          badgeStatus: t("hero.badgeStatus"),
        }}
      />

      <FeaturedProjects
        projects={featured as any}
        locale={locale}
        title={t("sections.projectsTitle")}
        subtitle={t("sections.projectsSubtitle")}
        labels={{
          viewDetails: t("projects.viewDetails"),
          sourceCode: t("projects.sourceCode"),
          liveDemo: t("projects.liveDemo"),
        }}
      />

      <SkillMatrix
        categories={categories as any}
        locale={locale}
        title={t("sections.skillsTitle")}
        subtitle={t("sections.skillsSubtitle")}
      />

      <ExperienceTimeline
        experiences={experiences as any}
        locale={locale}
        title={t("sections.experienceTitle")}
        subtitle={t("sections.experienceSubtitle")}
      />

      <CertificationsSection
        certifications={certifications as any}
        locale={locale}
        title={t("sections.certificationsTitle")}
        subtitle={t("sections.certificationsSubtitle")}
      />
    </div>
  );
}
