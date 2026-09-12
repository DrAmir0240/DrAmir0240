# SPECIFICATION & SYSTEM PROMPT: Interactive 3D Portfolio & Dynamic CMS
# Target Audience: AI Coding Agent (AntiGravity / Claude Code / Cursor)
# Project Owner: Amirhossein Omidi (Senior Backend & Systems Architect)

---

## 1. Project Overview & Architecture Goals

Build a cutting-edge, production-ready, dynamic **3D Personal Portfolio & CMS Platform** for **Amirhossein Omidi (امیرحسین امیدی)**, a Senior Backend Engineer & System Architect.

### Key Architectural Tenets
1. **Full-Stack Monolith on Next.js 14+ (App Router)**: API routes and server actions handle backend logic; Next.js SSR/SSG/ISR with full Netlify compatibility (`@netlify/plugin-nextjs`).
2. **Database & ORM**: PostgreSQL database managed via **Prisma ORM** (fully dockerized and deployable to managed Postgres like Supabase/Neon/Railway or self-hosted).
3. **Design System & Aesthetics**:
   - **Apple Liquid Glass / Glassmorphism**: Ultra-slick backdrop blurs (`backdrop-blur-2xl`), subtle hairline specular highlights (`rgba(255,255,255,0.1)`), glowing ambient depth, reactive mouse lights, and polished micro-interactions.
   - **Color Palettes**:
     - *Dark Theme (Default)*: Deep Obsidian & Void Black (`#050507`), Jet Slate (`#0B0C10`), Neon Silver/Cyan specular accents (`#38bdf8`, `#e2e8f0`).
     - *Light Theme*: Frosted Ice White (`#F8FAFC`), Translucent Milky White glass cards (`rgba(255,255,255,0.65)`), soft graphite typography (`#0F172A`).
4. **Interactive 3D Engine**: Three.js + React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`):
   - Hero 3D interactive model (Floating futuristic crystalline backend core / topological mesh with shader-driven pulse waves reacting to mouse coords).
   - High performance, automatic 60FPS throttling, fallback on low-power devices, Canvas unmounting on mobile if performance dips.
5. **Internationalization (i18n)**: Full dual-language support (**English** [LTR] & **Persian / فارسی** [RTL]). Dynamic locale switcher in the navbar that flips `dir="rtl"` and switches typography (Vazirmatn for FA, Inter/Geist for EN).
6. **Protected Dynamic CMS / Admin Panel**:
   - Secure credentials-based authentication (NextAuth.js v5 / Auth.js with bcrypt and session JWT).
   - Full CRUD for Articles/Blog posts (Markdown/MDX editor), Projects, Experiences, Skills, and Profile Metadata.
7. **Production Dockerization**: Production-grade multi-stage `Dockerfile` and `docker-compose.yml` (Next.js app + PostgreSQL + Redis for caching).

---

## 2. Technical Stack Specification

| Tier | Technologies |
| :--- | :--- |
| **Framework** | Next.js 14+ (App Router, Server Actions, Route Handlers) |
| **Language** | TypeScript (Strict mode enabled) |
| **Styling & UI** | Material UI (MUI v5) + Emotion + Tailwind CSS (configured alongside MUI for fluid utility glassmorphism) |
| **3D Rendering** | Three.js, `@react-three/fiber`, `@react-three/drei`, GLSL Shaders |
| **Animations** | Framer Motion (page transitions, scroll reveals, glass cards tilt) |
| **Database & ORM** | PostgreSQL 16+, Prisma ORM |
| **Authentication** | NextAuth.js / Auth.js (Credentials Provider with secure HTTP-only cookies) |
| **Internationalization** | `next-intl` (App Router compatible with dynamic Persian RTL / English LTR support) |
| **Content / Markdown** | `@mdx-js/react`, `react-markdown`, `remark-gfm`, `rehype-highlight` |
| **Deployment & Ops** | Docker, Docker Compose, Netlify adapter ready (`output: 'standalone'` compatible) |

---

## 3. Database Schema (`prisma/schema.prisma`)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  ADMIN
  USER
}

enum ProjectStatus {
  INTERNAL
  DEVELOPMENT
  DEMO_READY
  SHUTDOWN
  PRODUCTION
}

model AdminUser {
  id            String   @id @default(uuid())
  email         String   @unique
  passwordHash  String
  name          String
  role          Role     @default(ADMIN)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Profile {
  id              String   @id @default(uuid())
  fullNameEn      String   @default("Amirhossein Omidi")
  fullNameFa      String   @default("امیرحسین امیدی")
  titleEn         String   @default("Senior Backend Engineer & Systems Architect")
  titleFa         String   @default("برنامه نویس ارشد بک اند و معمار سیستم")
  bioEn           String   @db.Text
  bioFa           String   @db.Text
  locationEn      String   @default("Karaj, Iran")
  locationFa      String   @default("ایران، کرج")
  githubUrl       String?
  linkedinUrl     String?
  telegramUrl     String?
  email           String   @default("contact@amirhossein.dev")
  yearsExperience Int      @default(8)
  updatedAt       DateTime @updatedAt
}

model SkillCategory {
  id        String   @id @default(uuid())
  nameEn    String
  nameFa    String
  order     Int      @default(0)
  skills    Skill[]
}

model Skill {
  id          String        @id @default(uuid())
  name        String
  level       String        // Advanced, Mid-Level, Specialized
  proficiency Int           // 0 to 100
  iconKey     String?       // Lucide or SimpleIcon slug
  categoryId  String
  category    SkillCategory @relation(fields: [categoryId], references: [id], onDelete: Cascade)
}

model Project {
  id             String        @id @default(uuid())
  slug           String        @unique
  titleEn        String
  titleFa        String
  subtitleEn     String
  subtitleFa     String
  descriptionEn  String        @db.Text
  descriptionFa  String        @db.Text
  status         ProjectStatus @default(INTERNAL)
  techStack      String[]      // ["Python", "FastAPI", "PostgreSQL", "Docker"]
  architectureEn String?       @db.Text
  architectureFa String?       @db.Text
  githubUrl      String?
  liveUrl        String?
  featured       Boolean       @default(false)
  order          Int           @default(0)
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt
}

model Experience {
  id           String    @id @default(uuid())
  companyEn    String
  companyFa    String
  roleEn       String
  roleFa       String
  locationEn   String?
  locationFa   String?
  periodEn     String    // e.g. "2025 - Present"
  periodFa     String    // e.g. "۱۴۰۴ - اکنون"
  summaryEn    String    @db.Text
  summaryFa    String    @db.Text
  achievements String[]
  order        Int       @default(0)
  isCurrent    Boolean   @default(false)
}

model Certification {
  id         String   @id @default(uuid())
  titleEn    String
  titleFa    String
  issuerEn   String
  issuerFa   String
  year       String
  credential String?
  order      Int      @default(0)
}

model Article {
  id          String   @id @default(uuid())
  slug        String   @unique
  titleEn     String
  titleFa     String
  summaryEn   String   @db.Text
  summaryFa   String   @db.Text
  contentEn   String   @db.Text
  contentFa   String   @db.Text
  coverImage  String?
  tags        String[]
  published   Boolean  @default(false)
  readingTime String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

## 4. Curated Master Data (Seeding Content)

Use the following high-precision technical profile data for database seeding (`prisma/seed.ts`):

```typescript
export const initialProfile = {
  fullNameEn: "Amirhossein Omidi",
  fullNameFa: "امیرحسین امیدی",
  titleEn: "Senior Backend Engineer & Distributed Systems Architect",
  titleFa: "مهندس ارشد بک‌اند و معمار سیستم‌های توزیع‌شده",
  bioEn: "Senior Backend Architect with 8+ years of engineering experience specializing in high-throughput Python backends (FastAPI, Django), distributed microservices, event-driven pipelines, enterprise ERP database modeling, and LLM/MCP agent integrations.",
  bioFa: "برنامه نویس و معمار ارشد بک‌اند با بیش از ۸ سال سابقه مهندسی در توسعه سرویس‌های پیشرفته پایتون (FastAPI و Django)، میکروسرویس‌های رویدادمحور، پایگاه‌های داده مقیاس‌پذیر و تلفیق ابزارهای هوش مصنوعی و پروتکل‌های MCP در پلتفرم‌های سازمانی.",
  yearsExperience: 8,
};

export const initialSkills = [
  {
    categoryEn: "Backend Core & Systems",
    categoryFa: "هسته بک‌اند و زیرساخت",
    skills: [
      { name: "Python", level: "Advanced", proficiency: 98 },
      { name: "FastAPI", level: "Advanced", proficiency: 96 },
      { name: "Django & DRF", level: "Advanced", proficiency: 96 },
      { name: "SQL & Relational Modeling", level: "Advanced", proficiency: 95 },
      { name: "PostgreSQL & PgAdmin", level: "Advanced", proficiency: 95 },
      { name: "Low-Level (C & Assembly)", level: "Familiar", proficiency: 70 },
    ]
  },
  {
    categoryEn: "Distributed Systems & Streaming",
    categoryFa: "سیستم‌های توزیع‌شده و پردازش پیام",
    skills: [
      { name: "Apache Kafka", level: "Advanced", proficiency: 88 },
      { name: "RabbitMQ", level: "Advanced", proficiency: 92 },
      { name: "Redis (Pub/Sub & Caching)", level: "Advanced", proficiency: 95 },
      { name: "MongoDB", level: "Advanced", proficiency: 88 },
      { name: "Microservices Architecture", level: "Advanced", proficiency: 94 },
    ]
  },
  {
    categoryEn: "DevOps, Containerization & Networking",
    categoryFa: "دواپس، زیرساخت و شبکه",
    skills: [
      { name: "Docker & Docker Compose", level: "Advanced", proficiency: 95 },
      { name: "NGINX (Reverse Proxy, Load Balancing)", level: "Advanced", proficiency: 92 },
      { name: "Computer Networking & Protocols", level: "Intermediate", proficiency: 85 },
      { name: "System Security & Penetration Testing", level: "Intermediate", proficiency: 82 },
      { name: "CI/CD & GitHub Actions", level: "Advanced", proficiency: 90 },
    ]
  },
  {
    categoryEn: "AI Engineering & Machine Learning",
    categoryFa: "هوش مصنوعی و یادگیری ماشین",
    skills: [
      { name: "Model Context Protocol (MCP) Servers", level: "Advanced", proficiency: 92 },
      { name: "LLM Orchestration & Prompt Engineering", level: "Advanced", proficiency: 94 },
      { name: "PyTorch", level: "Applied", proficiency: 78 },
      { name: "Pandas & NumPy", level: "Advanced", proficiency: 88 },
      { name: "Autonomous Coding Agents (Agentic Workflows)", level: "Advanced", proficiency: 92 },
    ]
  },
  {
    categoryEn: "Frontend & Full-Stack Interfaces",
    categoryFa: "فرانت‌اند و رابط کاربری",
    skills: [
      { name: "JavaScript (ESNext)", level: "Mid-Level", proficiency: 80 },
      { name: "TypeScript", level: "Mid-Level", proficiency: 82 },
      { name: "React.js", level: "Mid-Level", proficiency: 80 },
      { name: "Next.js (App Router)", level: "Mid-Level", proficiency: 82 },
    ]
  }
];

export const initialProjects = [
  {
    slug: "drgame-erp",
    titleEn: "DrGame ERP Platform",
    titleFa: "سامانه جامع ERP دکترگیم",
    subtitleEn: "High-scale enterprise retail and inventory orchestration engine",
    subtitleFa: "موتور مدیریت خرده‌فروشی سازمانی و انبارداری مقیاس‌پذیر",
    descriptionEn: "Designed and implemented end-to-end backend micro-apps spanning inventory tracking, automated accounting ledger, HR payroll, CRM, and order fulfillment systems using Django/DRF and PostgreSQL.",
    descriptionFa: "طراحی و توسعه معمارانه سامانه جامع ERP فروشگاهی شامل ماژول‌های انبارداری چندشعبه‌ای، دفترکل حسابداری، سیستم‌های CRM و HRM بر پایه معماری ماژولار جنگو و پایگاه داده پستگرس.",
    status: "INTERNAL",
    techStack: ["Python", "Django", "DRF", "PostgreSQL", "Redis", "Docker", "NGINX"],
    featured: true
  },
  {
    slug: "neura-erp",
    titleEn: "Neura-ERP (Multi-Tenant Platform)",
    titleFa: "پلتفرم نیورا ای‌آرپی (چندمستاجری)",
    subtitleEn: "Cloud B2B multi-tenant enterprise suite with 13+ interconnected modules",
    subtitleFa: "سوئیت ابری سازمانی چندمستاجره مبتنی بر معماری سرویس‌گرا با بیش از ۱۳ ماژول همگام",
    descriptionEn: "Engineered multi-tenant database partitioning across Organization, RBAC, Double-Entry Accounting, Dynamic Inventory, Workflow Automation, and Wallet engines powered by FastAPI and PostgreSQL.",
    descriptionFa: "معماری دیتابیس توزیع‌شده با تفکیک سازمانی (Multi-Tenancy) در ۱۳ ماژول شامل حسابداری دوبل، اتوماسیون انبارداری، کیف پول دیجیتال و مجوزهای RBAC بر بستر FastAPI.",
    status: "DEVELOPMENT",
    techStack: ["FastAPI", "SQLAlchemy", "PostgreSQL", "Alembic", "Redis", "Docker"],
    featured: true
  },
  {
    slug: "tida-erp",
    titleEn: "Tida-ERP (AI-Integrated System)",
    titleFa: "تیدا ای‌آرپی (همگام با هوش مصنوعی)",
    subtitleEn: "Modern RTL ERP engine integrated with AI agent automation workflows",
    subtitleFa: "موتور مدرن ERP بومی‌سازی شده با قابلیت اتصال به ایجنت‌های هوشمند خودکار",
    descriptionEn: "Enterprise resource suite equipped with JWT/OTP Melipayamak authentication, CRM, human resource pipelines, and integration interfaces for Model Context Protocol (MCP) agent tools.",
    descriptionFa: "توسعه ماژول‌های احراز هویت پیامکی، اتوماسیون جریان کاری منابع انسانی، CRM و فراهم‌سازی رابط‌های ارتباطی با ابزارهای مبتنی بر پروتکل کانتکست مدل (MCP).",
    status: "DEMO_READY",
    techStack: ["FastAPI", "Python", "PostgreSQL", "MCP Server", "Docker", "Next.js"],
    featured: true
  },
  {
    slug: "fitno",
    titleEn: "Fitno Platform",
    titleFa: "پلتفرم سلامت و تناسب اندام فیتنو",
    subtitleEn: "High-load user workout planning and telemetry platform",
    subtitleFa: "سامانه پردازش برنامه‌های ورزشی و تله‌متری با لود تراکنش بالا",
    descriptionEn: "Production backend architecture providing automated subscription workflows, streaming health telemetry data, and dynamic schedule generators.",
    descriptionFa: "پیاده‌سازی معماری بک‌اند با لود بالا، سیستم مدیریت اشتراک‌ها و پردازش آنی داده‌های سلامت کاربران.",
    status: "INTERNAL",
    techStack: ["Python", "Django", "PostgreSQL", "Redis", "Celery", "Docker"],
    featured: false
  },
  {
    slug: "varzev",
    titleEn: "Varzev Sports Engine",
    titleFa: "موتور مدیریت ورزشی ورزو",
    subtitleEn: "Sports tournament and club management system",
    subtitleFa: "سیستم مدیریت تورنمنت‌ها و مجموعه‌های ورزشی",
    descriptionEn: "Orchestrated tournament bracket generation, ticketing, and member access management pipelines.",
    descriptionFa: "توسعه زیرساخت زمان‌بندی مسابقات، مدیریت دسترسی اعضا و پردازش تراکنش‌های مالی.",
    status: "SHUTDOWN",
    techStack: ["Python", "FastAPI", "PostgreSQL", "Docker"],
    featured: false
  }
];

export const initialExperiences = [
  {
    companyEn: "Hooshmand Mobtakeran Novin Alborz Co.",
    companyFa: "شرکت هوشمند مبتکران نوین البرز",
    roleEn: "Senior Backend Engineer & Lead Architect",
    roleFa: "برنامه نویس ارشد بک‌اند و معمار نرم‌افزار",
    periodEn: "2025 - Present",
    periodFa: "۱۴۰۴ - اکنون",
    summaryEn: "Leading enterprise ERP architecture, integrating AI agent protocols (MCP), and directing high-performance asynchronous microservice engines.",
    summaryFa: "رهبری معماری سیستم‌های سازمانی ERP، پیاده‌سازی پروتکل‌های MCP جهت اتصال ابزارهای هوش مصنوعی و بهینه‌سازی پایپ‌لاین‌های غیرهمگام با لود بالا.",
    isCurrent: true
  },
  {
    companyEn: "Arka Afzar",
    companyFa: "شرکت آرکا افزار",
    roleEn: "Senior Backend Developer & Technical Manager",
    roleFa: "برنامه نویس ارشد و مدیر فنی",
    periodEn: "2021 - 2024",
    periodFa: "۱۴۰۰ - ۱۴۰۳",
    summaryEn: "Headed engineering teams, architected core accounting and inventory applications, guided deployment pipelines and microservices migration.",
    summaryFa: "هدایت تیم فنی مهندسی، معماری سیستم‌های جامع انبارداری و حسابداری، پیاده‌سازی زیرساخت‌های استقرار مداوم (CI/CD) و گذار به میکروسرویس‌ها.",
    isCurrent: false
  },
  {
    companyEn: "Upwork Global Freelancing",
    companyFa: "پلتفرم فریلنسری بین‌المللی Upwork",
    roleEn: "Senior Python/Backend Freelancer & Team Lead",
    roleFa: "برنامه‌نویس ارشد پایتون و مدیر تیم فنی",
    periodEn: "2019 - Present",
    periodFa: "۱۳۹۸ - اکنون",
    summaryEn: "Delivered complex backend APIs, message queuing pipelines, and multi-tenant database systems for global clients while directing a dedicated remote engineering team.",
    summaryFa: "طراحی و تحویل پروژه‌های بین‌المللی بک‌اند، پیاده‌سازی سیستم‌های توزیع‌شده صف و ساختارهای دیتابیس برای مشتریان بین‌المللی به همراه مدیریت تیم فنی.",
    isCurrent: true
  }
];

export const initialCertifications = [
  {
    titleEn: "CS50: Introduction to Computer Science",
    titleFa: "مدرک علوم کامپیوتر CS50",
    issuerEn: "Harvard University",
    issuerFa: "دانشگاه هاروارد",
    year: "Verified",
  },
  {
    titleEn: "Advanced Software & Programming Certification",
    titleFa: "گواهی تخصصی برنامه‌نویسی و مهندسی نرم‌افزار",
    issuerEn: "Sharif University of Technology",
    issuerFa: "دانشگاه صنعتی شریف",
    year: "Verified",
  },
  {
    titleEn: "B.Sc. in Software Engineering",
    titleFa: "کارشناسی مهندسی نرم‌افزار",
    issuerEn: "Islamic Azad University, Karaj Branch",
    issuerFa: "دانشگاه آزاد اسلامی واحد کرج",
    year: "Graduate",
  }
];
```

---

## 5. Visual Design System: Apple Liquid Glass & 3D Styling

### Liquid Glass Philosophy
1. **Multi-layer Glass Panels**:
   ```css
   /* Dark Liquid Glass */
   .liquid-glass-dark {
     background: rgba(13, 14, 20, 0.55);
     backdrop-filter: blur(28px) saturate(190%);
     -webkit-backdrop-filter: blur(28px) saturate(190%);
     border: 1px solid rgba(255, 255, 255, 0.08);
     box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6),
                 inset 0 1px 1px rgba(255, 255, 255, 0.12);
   }

   /* Light Liquid Glass */
   .liquid-glass-light {
     background: rgba(255, 255, 255, 0.62);
     backdrop-filter: blur(28px) saturate(180%);
     -webkit-backdrop-filter: blur(28px) saturate(180%);
     border: 1px solid rgba(255, 255, 255, 0.6);
     box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06),
                 inset 0 1px 2px rgba(255, 255, 255, 0.8);
   }
   ```
2. **Interactive 3D Hero (`components/three/CoreMesh.tsx`)**:
   - Dynamic wireframe/metallic geometric dodecahedron or topological knot rotating on orbital axes.
   - Responds to mouse move and pointer velocity via dynamic lerp damping.
   - Floating particle points representing network nodes / microservices.
   - Color tint shifts dynamically between Dark Mode (deep obsidian, cyan glow `#38bdf8`) and Light Mode (iridescent chrome, platinum blue).
3. **MUI v5 + Emotion Theme Setup**:
   - Integrates with Next.js App Router via emotion cache with SSR support.
   - Dual theme provider supporting light and dark modes toggleable from the navbar.
   - Persian typography: `fontFamily: 'Vazirmatn', sans-serif`, English: `'Inter', sans-serif`.

---

## 6. Project Directory & File Structure

```text
├── Dockerfile
├── docker-compose.yml
├── netlify.toml
├── next.config.mjs
├── package.json
├── tsconfig.json
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
│   ├── fonts/
│   └── models/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── admin/
│   │   │   │   ├── login/page.tsx
│   │   │   │   ├── dashboard/page.tsx
│   │   │   │   ├── articles/page.tsx
│   │   │   │   ├── projects/page.tsx
│   │   │   │   └── settings/page.tsx
│   │   │   └── api/
│   │   │       ├── auth/[...nextauth]/route.ts
│   │   │       ├── articles/route.ts
│   │   │       └── projects/route.ts
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── HeroScene.tsx
│   │   │   ├── NodeCore.tsx
│   │   │   └── ParticlesBackground.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── LocaleSwitcher.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── ui/
│   │   │   ├── GlassCard.tsx
│   │   │   ├── SectionHeader.tsx
│   │   │   └── TechBadge.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ExperienceTimeline.tsx
│   │   │   ├── SkillMatrix.tsx
│   │   │   ├── FeaturedProjects.tsx
│   │   │   └── CertificationsSection.tsx
│   │   └── admin/
│   │       ├── AdminSidebar.tsx
│   │       ├── MarkdownEditor.tsx
│   │       └── DataTable.tsx
│   ├── context/
│   │   ├── ThemeContext.tsx
│   │   └── AuthProvider.tsx
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── auth.ts
│   │   └── utils.ts
│   └── messages/
│       ├── en.json
│       └── fa.json
```

---

## 7. Key Code Implementations

### A. Three.js Interactive Hero Scene (`src/components/3d/HeroScene.tsx`)

```tsx
"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@mui/material";

function DynamicBackendCore({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireframeRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t / 4) * 0.4;
    meshRef.current.rotation.y = t * 0.25;
    wireframeRef.current.rotation.x = -t * 0.15;
    wireframeRef.current.rotation.z = Math.cos(t / 3) * 0.3;
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Liquid Organic Sphere Core */}
      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.8}>
        <Sphere ref={meshRef} args={[1.5, 64, 64]}>
          <MeshDistortMaterial
            color={isDark ? "#0ea5e9" : "#38bdf8"}
            attach="material"
            distort={0.45}
            speed={2}
            roughness={0.15}
            metalness={0.85}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Sphere>
      </Float>

      {/* Outer Hexagonal Geometric Cage */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[2.3, 2]} />
        <meshStandardMaterial
          wireframe
          color={isDark ? "#64748b" : "#94a3b8"}
          emissive={isDark ? "#0284c7" : "#cbd5e1"}
          emissiveIntensity={isDark ? 0.6 : 0.2}
          transparent
          opacity={isDark ? 0.45 : 0.65}
        />
      </mesh>

      {/* Floating Network Nodes */}
      <Sparkles
        count={70}
        scale={6}
        size={isDark ? 2.5 : 1.8}
        speed={0.4}
        color={isDark ? "#38bdf8" : "#0284c7"}
      />
    </group>
  );
}

export default function HeroScene() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <div className="w-full h-[480px] lg:h-[620px] relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={isDark ? 0.6 : 1.2} />
        <directionalLight position={[10, 10, 5]} intensity={isDark ? 1.8 : 2.5} />
        <pointLight position={[-10, -10, -5]} color={isDark ? "#38bdf8" : "#0284c7"} intensity={1.5} />
        <DynamicBackendCore isDark={isDark} />
      </Canvas>
    </div>
  );
}
```

---

### B. Apple Liquid Glass Card Component (`src/components/ui/GlassCard.tsx`)

```tsx
"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { useTheme } from "@mui/material";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  glow = false,
  ...props
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{
        background: isDark
          ? "rgba(15, 17, 24, 0.68)"
          : "rgba(255, 255, 255, 0.68)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        border: isDark
          ? "1px solid rgba(255, 255, 255, 0.09)"
          : "1px solid rgba(255, 255, 255, 0.8)",
        boxShadow: isDark
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.12)"
          : "0 20px 40px -15px rgba(0, 0, 0, 0.07), inset 0 1px 2px rgba(255, 255, 255, 0.9)",
      }}
      className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 transition-colors duration-300 ${
        glow ? "ring-1 ring-sky-500/30" : ""
      } ${className}`}
      {...props}
    >
      {/* Specular Radial Gradient for Ambient Light Follow */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-gradient-to-br from-sky-400/10 to-transparent blur-2xl" />
      {children}
    </motion.div>
  );
};
```

---

### C. Dockerfile & Production Multi-Stage Build

```dockerfile
# Multi-stage production build for Next.js with Prisma & standalone output
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl

# 1. Dependencies stage
FROM base AS deps
COPY package.json package-lock.json* pnpm-lock.yaml* ./
COPY prisma ./prisma/
RUN npm ci

# 2. Builder stage
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN npx prisma generate
RUN npm run build

# 3. Production runner stage
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
```

---

### D. Docker Compose (`docker-compose.yml`)

```yaml
version: "3.9"

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: amirhossein-portfolio-app
    restart: always
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://omidi_admin:SecurePass123_@postgres:5432/omidi_portfolio_db?schema=public
      - NEXTAUTH_SECRET=super_random_jwt_secret_token_change_in_production
      - NEXTAUTH_URL=http://localhost:3000
      - NODE_ENV=production
    depends_on:
      postgres:
        condition: service_healthy

  postgres:
    image: postgres:16-alpine
    container_name: amirhossein-portfolio-db
    restart: always
    environment:
      POSTGRES_USER: omidi_admin
      POSTGRES_PASSWORD: SecurePass123_
      POSTGRES_DB: omidi_portfolio_db
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U omidi_admin -d omidi_portfolio_db"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  pgdata:
    driver: local
```

---

### E. Netlify Deployment Specification (`netlify.toml`)

```toml
[build]
  command = "prisma generate && npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "20"
  NPM_FLAGS = "--legacy-peer-deps"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

---

## 8. AntiGravity Agent Execution Step-by-Step Prompt

When handing this specification file (`PORTFOLIO_SPEC.md`) to the AntiGravity agent or cursor/claude-code, run this command prompt:

```markdown
Read the entire `PORTFOLIO_SPEC.md` specification file.
Execute the full initialization and project scaffold:
1. Initialize Next.js 14+ App Router with TypeScript and Tailwind CSS.
2. Install MUI v5 (`@mui/material`, `@emotion/react`, `@emotion/styled`), Three.js (`three`, `@types/three`, `@react-three/fiber`, `@react-three/drei`), Framer Motion, and NextAuth.
3. Configure `prisma/schema.prisma` with PostgreSQL models for AdminUser, Profile, Skill, Project, Experience, Certification, and Article.
4. Setup `prisma/seed.ts` using the provided curated data for Amirhossein Omidi (امیرحسین امیدی).
5. Build the Apple Liquid Glass design tokens (dark obsidian mode default and light frosty glass mode).
6. Implement the dual-language layout (`/en` and `/fa`) with RTL support for Persian and LTR for English.
7. Implement the Hero 3D interactive core mesh component.
8. Build the public routes: Home, Projects (`/projects` & `/[slug]`), and Blog/Articles (`/blog` & `/[slug]`).
9. Build the secured `/admin` dashboard with NextAuth credentials authentication for managing articles, projects, and site content.
10. Ensure the Dockerfile and docker-compose.yml build cleanly.