import {
  initialProfile,
  initialSkillCategories,
  initialProjects,
  initialExperiences,
  initialCertifications,
  initialArticles,
} from "../../prisma/seed";
import { prisma } from "@/lib/prisma";

export async function getProfileData() {
  try {
    const dbProfile = await prisma.profile.findFirst();
    if (dbProfile) return dbProfile;
  } catch (e) {
    // Return curated fallback data if database is not connected
  }
  return initialProfile;
}

export async function getSkillCategories() {
  try {
    const dbCategories = await prisma.skillCategory.findMany({
      include: { skills: true },
      orderBy: { order: "asc" },
    });
    if (dbCategories && dbCategories.length > 0) return dbCategories;
  } catch (e) {
    // Return curated fallback
  }
  return initialSkillCategories.map((c, idx) => ({
    id: `cat-${idx}`,
    ...c,
  }));
}

export async function getProjects() {
  try {
    const dbProjects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
    if (dbProjects && dbProjects.length > 0) return dbProjects;
  } catch (e) {
    // Return curated fallback
  }
  return initialProjects.map((p, idx) => ({
    id: `proj-${idx}`,
    ...p,
  }));
}

export async function getProjectBySlug(slug: string) {
  try {
    const dbProject = await prisma.project.findUnique({
      where: { slug },
    });
    if (dbProject) return dbProject;
  } catch (e) {
    // Return curated fallback
  }
  return initialProjects.find((p) => p.slug === slug) || null;
}

export async function getExperiences() {
  try {
    const dbExp = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });
    if (dbExp && dbExp.length > 0) return dbExp;
  } catch (e) {
    // Return curated fallback
  }
  return initialExperiences.map((exp, idx) => ({
    id: `exp-${idx}`,
    ...exp,
  }));
}

export async function getCertifications() {
  try {
    const dbCerts = await prisma.certification.findMany({
      orderBy: { order: "asc" },
    });
    if (dbCerts && dbCerts.length > 0) return dbCerts;
  } catch (e) {
    // Return curated fallback
  }
  return initialCertifications.map((c, idx) => ({
    id: `cert-${idx}`,
    ...c,
  }));
}

export async function getArticles() {
  try {
    const dbArticles = await prisma.article.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    if (dbArticles && dbArticles.length > 0) return dbArticles;
  } catch (e) {
    // Return curated fallback
  }
  return initialArticles.map((a, idx) => ({
    id: `art-${idx}`,
    createdAt: new Date(),
    ...a,
  }));
}

export async function getArticleBySlug(slug: string) {
  try {
    const dbArticle = await prisma.article.findUnique({
      where: { slug },
    });
    if (dbArticle) return dbArticle;
  } catch (e) {
    // Return curated fallback
  }
  const article = initialArticles.find((a) => a.slug === slug);
  if (!article) return null;
  return {
    id: "art-fallback",
    createdAt: new Date(),
    ...article,
  };
}
