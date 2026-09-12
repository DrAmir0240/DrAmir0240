import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const initialProfile = {
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
  fullNameEn: "Amirhossein Omidi",
  fullNameFa: "امیرحسین امیدی",
  titleEn: "Senior Backend Engineer & Distributed Systems Architect",
  titleFa: "مهندس ارشد بک‌اند و معمار سیستم‌های توزیع‌شده",
  bioEn:
    "Senior Backend Architect with 8+ years of engineering experience specializing in high-throughput Python backends (FastAPI, Django), distributed microservices, event-driven pipelines, enterprise ERP database modeling, and LLM/MCP agent integrations.",
  bioFa:
    "برنامه نویس و معمار ارشد بک‌اند با بیش از ۸ سال سابقه مهندسی در توسعه سرویس‌های پیشرفته پایتون (FastAPI و Django)، میکروسرویس‌های رویدادمحور، پایگاه‌های داده مقیاس‌پذیر و تلفیق ابزارهای هوش مصنوعی و پروتکل‌های MCP در پلتفرم‌های سازمانی.",
  locationEn: "Karaj, Iran",
  locationFa: "ایران، کرج",
  email: "contact@amirhossein.dev",
  githubUrl: "https://github.com",
  linkedinUrl: "https://linkedin.com",
  telegramUrl: "https://t.me",
  yearsExperience: 8,
};

export const initialSkillCategories = [
  {
    nameEn: "Backend Core & Systems",
    nameFa: "هسته بک‌اند و زیرساخت",
    order: 1,
    skills: [
      { name: "Python", level: "Advanced", proficiency: 98, iconKey: "python" },
      { name: "FastAPI", level: "Advanced", proficiency: 96, iconKey: "fastapi" },
      { name: "Django & DRF", level: "Advanced", proficiency: 96, iconKey: "django" },
      { name: "SQL & Relational Modeling", level: "Advanced", proficiency: 95, iconKey: "database" },
      { name: "PostgreSQL & PgAdmin", level: "Advanced", proficiency: 95, iconKey: "postgresql" },
      { name: "Low-Level (C & Assembly)", level: "Familiar", proficiency: 70, iconKey: "cpu" },
    ],
  },
  {
    nameEn: "Distributed Systems & Streaming",
    nameFa: "سیستم‌های توزیع‌شده و پردازش پیام",
    order: 2,
    skills: [
      { name: "Apache Kafka", level: "Advanced", proficiency: 88, iconKey: "kafka" },
      { name: "RabbitMQ", level: "Advanced", proficiency: 92, iconKey: "rabbitmq" },
      { name: "Redis (Pub/Sub & Caching)", level: "Advanced", proficiency: 95, iconKey: "redis" },
      { name: "MongoDB", level: "Advanced", proficiency: 88, iconKey: "mongodb" },
      { name: "Microservices Architecture", level: "Advanced", proficiency: 94, iconKey: "network" },
    ],
  },
  {
    nameEn: "DevOps, Containerization & Networking",
    nameFa: "دواپس، زیرساخت و شبکه",
    order: 3,
    skills: [
      { name: "Docker & Docker Compose", level: "Advanced", proficiency: 95, iconKey: "docker" },
      { name: "NGINX (Reverse Proxy, Load Balancing)", level: "Advanced", proficiency: 92, iconKey: "server" },
      { name: "Computer Networking & Protocols", level: "Intermediate", proficiency: 85, iconKey: "globe" },
      { name: "System Security & Penetration Testing", level: "Intermediate", proficiency: 82, iconKey: "shield" },
      { name: "CI/CD & GitHub Actions", level: "Advanced", proficiency: 90, iconKey: "git" },
    ],
  },
  {
    nameEn: "AI Engineering & Machine Learning",
    nameFa: "هوش مصنوعی و یادگیری ماشین",
    order: 4,
    skills: [
      { name: "Model Context Protocol (MCP) Servers", level: "Advanced", proficiency: 92, iconKey: "bot" },
      { name: "LLM Orchestration & Prompt Engineering", level: "Advanced", proficiency: 94, iconKey: "sparkles" },
      { name: "PyTorch", level: "Applied", proficiency: 78, iconKey: "brain" },
      { name: "Pandas & NumPy", level: "Advanced", proficiency: 88, iconKey: "table" },
      { name: "Autonomous Coding Agents", level: "Advanced", proficiency: 92, iconKey: "terminal" },
    ],
  },
  {
    nameEn: "Frontend & Full-Stack Interfaces",
    nameFa: "فرانت‌اند و رابط کاربری",
    order: 5,
    skills: [
      { name: "JavaScript (ESNext)", level: "Mid-Level", proficiency: 80, iconKey: "code" },
      { name: "TypeScript", level: "Mid-Level", proficiency: 82, iconKey: "file-code" },
      { name: "React.js", level: "Mid-Level", proficiency: 80, iconKey: "react" },
      { name: "Next.js (App Router)", level: "Mid-Level", proficiency: 82, iconKey: "layers" },
    ],
  },
];

export const initialProjects = [
  {
    slug: "drgame-erp",
    titleEn: "DrGame ERP Platform",
    titleFa: "سامانه جامع ERP دکترگیم",
    subtitleEn: "High-scale enterprise retail and inventory orchestration engine",
    subtitleFa: "موتور مدیریت خرده‌فروشی سازمانی و انبارداری مقیاس‌پذیر",
    descriptionEn:
      "Designed and implemented end-to-end backend micro-apps spanning inventory tracking, automated accounting ledger, HR payroll, CRM, and order fulfillment systems using Django/DRF and PostgreSQL.",
    descriptionFa:
      "طراحی و توسعه معمارانه سامانه جامع ERP فروشگاهی شامل ماژول‌های انبارداری چندشعبه‌ای، دفترکل حسابداری، سیستم‌های CRM و HRM بر پایه معماری ماژولار جنگو و پایگاه داده پستگرس.",
    status: "INTERNAL" as const,
    techStack: ["Python", "Django", "DRF", "PostgreSQL", "Redis", "Docker", "NGINX"],
    architectureEn: "Modular Monolith moving to event-driven services via Redis queues, high concurrency DB locks, row-level security.",
    architectureFa: "معماری ماژولار یکپارچه در حال گذار به میکروسرویس‌های رویدادمحور با صف‌های ردیس و قفل‌های همزمانی داده پستگرس.",
    liveUrl: "https://drgame.ir",
    galleryImages: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
    ],
    featured: true,
    order: 1,
  },
  {
    slug: "neura-erp",
    titleEn: "Neura-ERP (Multi-Tenant Platform)",
    titleFa: "پلتفرم نیورا ای‌آرپی (چندمستاجری)",
    subtitleEn: "Cloud B2B multi-tenant enterprise suite with 13+ interconnected modules",
    subtitleFa: "سوئیت ابری سازمانی چندمستاجره مبتنی بر معماری سرویس‌گرا با بیش از ۱۳ ماژول همگام",
    descriptionEn:
      "Engineered multi-tenant database partitioning across Organization, RBAC, Double-Entry Accounting, Dynamic Inventory, Workflow Automation, and Wallet engines powered by FastAPI and PostgreSQL.",
    descriptionFa:
      "معماری دیتابیس توزیع‌شده با تفکیک سازمانی (Multi-Tenancy) در ۱۳ ماژول شامل حسابداری دوبل، اتوماسیون انبارداری، کیف پول دیجیتال و مجوزهای RBAC بر بستر FastAPI.",
    status: "DEVELOPMENT" as const,
    techStack: ["FastAPI", "SQLAlchemy", "PostgreSQL", "Alembic", "Redis", "Docker"],
    architectureEn: "Schema-based multi-tenancy with async SQLAlchemy, background celery tasks, distributed transaction coordinator.",
    architectureFa: "چندمستاجری بر اساس Schema در پستگرس با SQLAlchemy غیرهمگام، پردازش پس‌زمینه تسک‌ها و مدیریت تراکنش‌های توزیع‌شده.",
    liveUrl: "https://neura-erp.cloud",
    galleryImages: [
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1200"
    ],
    featured: true,
    order: 2,
  },
  {
    slug: "tida-erp",
    titleEn: "Tida-ERP (AI-Integrated System)",
    titleFa: "تیدا ای‌آرپی (همگام با هوش مصنوعی)",
    subtitleEn: "Modern RTL ERP engine integrated with AI agent automation workflows",
    subtitleFa: "موتور مدرن ERP بومی‌سازی شده با قابلیت اتصال به ایجنت‌های هوشمند خودکار",
    descriptionEn:
      "Enterprise resource suite equipped with JWT/OTP Melipayamak authentication, CRM, human resource pipelines, and integration interfaces for Model Context Protocol (MCP) agent tools.",
    descriptionFa:
      "توسعه ماژول‌های احراز هویت پیامکی، اتوماسیون جریان کاری منابع انسانی، CRM و فراهم‌سازی رابط‌های ارتباطی با ابزارهای مبتنی بر پروتکل کانتکست مدل (MCP).",
    status: "DEMO_READY" as const,
    techStack: ["FastAPI", "Python", "PostgreSQL", "MCP Server", "Docker", "Next.js"],
    architectureEn: "FastAPI REST API paired with Model Context Protocol (MCP) JSON-RPC endpoints for autonomous agent introspection.",
    architectureFa: "وب‌سرویس سریع بر پایه FastAPI متصل به پروتکل کانتکست مدل (MCP) جهت تعامل ایجنت‌های هوشمند با تراکنش‌های تجاری.",
    liveUrl: "https://tida-erp.dev",
    galleryImages: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200"
    ],
    featured: true,
    order: 3,
  },
  {
    slug: "fitno",
    titleEn: "Fitno Platform",
    titleFa: "پلتفرم سلامت و تناسب اندام فیتنو",
    subtitleEn: "High-load user workout planning and telemetry platform",
    subtitleFa: "سامانه پردازش برنامه‌های ورزشی و تله‌متری با لود تراکنش بالا",
    descriptionEn:
      "Production backend architecture providing automated subscription workflows, streaming health telemetry data, and dynamic schedule generators.",
    descriptionFa:
      "پیاده‌سازی معماری بک‌اند با لود بالا، سیستم مدیریت اشتراک‌ها و پردازش آنی داده‌های سلامت کاربران.",
    status: "INTERNAL" as const,
    techStack: ["Python", "Django", "PostgreSQL", "Redis", "Celery", "Docker"],
    featured: false,
    order: 4,
  },
  {
    slug: "varzev",
    titleEn: "Varzev Sports Engine",
    titleFa: "موتور مدیریت ورزشی ورزو",
    subtitleEn: "Sports tournament and club management system",
    subtitleFa: "سیستم مدیریت تورنمنت‌ها و مجموعه‌های ورزشی",
    descriptionEn: "Orchestrated tournament bracket generation, ticketing, and member access management pipelines.",
    descriptionFa: "توسعه زیرساخت زمان‌بندی مسابقات، مدیریت دسترسی اعضا و پردازش تراکنش‌های مالی.",
    status: "SHUTDOWN" as const,
    techStack: ["Python", "FastAPI", "PostgreSQL", "Docker"],
    featured: false,
    order: 5,
  },
];

export const initialExperiences = [
  {
    companyEn: "Hooshmand Mobtakeran Novin Alborz Co.",
    companyFa: "شرکت هوشمند مبتکران نوین البرز",
    roleEn: "Senior Backend Engineer & Lead Architect",
    roleFa: "برنامه نویس ارشد بک‌اند و معمار نرم‌افزار",
    periodEn: "2025 - Present",
    periodFa: "۱۴۰۴ - اکنون",
    summaryEn:
      "Leading enterprise ERP architecture, integrating AI agent protocols (MCP), and directing high-performance asynchronous microservice engines.",
    summaryFa:
      "رهبری معماری سیستم‌های سازمانی ERP، پیاده‌سازی پروتکل‌های MCP جهت اتصال ابزارهای هوش مصنوعی و بهینه‌سازی پایپ‌لاین‌های غیرهمگام با لود بالا.",
    achievements: [
      "Designed and deployed enterprise-grade multi-tenant architecture serving concurrent business entities.",
      "Integrated Model Context Protocol (MCP) server allowing LLM agent tool calling into backend ERP services.",
      "Engineered sub-50ms API response bottlenecks utilizing Redis pipelining and PostgreSQL query indexing.",
    ],
    isCurrent: true,
    order: 1,
  },
  {
    companyEn: "Arka Afzar",
    companyFa: "شرکت آرکا افزار",
    roleEn: "Senior Backend Developer & Technical Manager",
    roleFa: "برنامه نویس ارشد و مدیر فنی",
    periodEn: "2021 - 2024",
    periodFa: "۱۴۰۰ - ۱۴۰۳",
    summaryEn:
      "Headed engineering teams, architected core accounting and inventory applications, guided deployment pipelines and microservices migration.",
    summaryFa:
      "هدایت تیم فنی مهندسی، معماری سیستم‌های جامع انبارداری و حسابداری، پیاده‌سازی زیرساخت‌های استقرار مداوم (CI/CD) و گذار به میکروسرویس‌ها.",
    achievements: [
      "Directed team of 8 engineers delivering enterprise accounting ledger and retail POS sync engines.",
      "Reduced system downtime by 99.4% through containerized Docker Compose setups and automated database replicas.",
    ],
    isCurrent: false,
    order: 2,
  },
  {
    companyEn: "Upwork Global Freelancing",
    companyFa: "پلتفرم فریلنسری بین‌المللی Upwork",
    roleEn: "Senior Python/Backend Freelancer & Team Lead",
    roleFa: "برنامه‌نویس ارشد پایتون و مدیر تیم فنی",
    periodEn: "2019 - Present",
    periodFa: "۱۳۹۸ - اکنون",
    summaryEn:
      "Delivered complex backend APIs, message queuing pipelines, and multi-tenant database systems for global clients while directing a dedicated remote engineering team.",
    summaryFa:
      "طراحی و تحویل پروژه‌های بین‌المللی بک‌اند، پیاده‌سازی سیستم‌های توزیع‌شده صف و ساختارهای دیتابیس برای مشتریان بین‌المللی به همراه مدیریت تیم فنی.",
    achievements: [
      "Top-Rated contractor completing 20+ enterprise integration projects with 100% job success rate.",
      "Architected real-time telemetry processing pipelines handling millions of data points per day.",
    ],
    isCurrent: true,
    order: 3,
  },
];

export const initialCertifications = [
  {
    titleEn: "CS50: Introduction to Computer Science",
    titleFa: "مدرک علوم کامپیوتر CS50",
    issuerEn: "Harvard University",
    issuerFa: "دانشگاه هاروارد",
    year: "Verified",
    order: 1,
  },
  {
    titleEn: "Advanced Software & Programming Certification",
    titleFa: "گواهی تخصصی برنامه‌نویسی و مهندسی نرم‌افزار",
    issuerEn: "Sharif University of Technology",
    issuerFa: "دانشگاه صنعتی شریف",
    year: "Verified",
    order: 2,
  },
  {
    titleEn: "B.Sc. in Software Engineering",
    titleFa: "کارشناسی مهندسی نرم‌افزار",
    issuerEn: "Islamic Azad University, Karaj Branch",
    issuerFa: "دانشگاه آزاد اسلامی واحد کرج",
    year: "Graduate",
    order: 3,
  },
];

export const initialArticles = [
  {
    slug: "architecting-high-throughput-microservices-fastapi",
    titleEn: "Architecting High-Throughput Event-Driven Microservices with FastAPI & Kafka",
    titleFa: "معماری میکروسرویس‌های رویدادمحور و با توان بالا با FastAPI و آپاچی کافکا",
    summaryEn: "A deep dive into asynchronous pipeline design, event sourcing, idempotent message consumers, and low-latency database connection pooling in Python.",
    summaryFa: "بررسی عمیق طراحی خط لوله داده ناهمگام، الگوهای ذخیره‌سازی رویداد، مصرف‌کنندگان داده شناسا و پولینگ ارتباط پایگاه‌داده کم‌تاخیر در پایتون.",
    contentEn: `### Introduction\nDistributed backend engineering requires decoupling compute from real-time events. In modern high-load systems, combining FastAPI with Apache Kafka delivers unprecedented throughput.\n\n### Key Principles\n1. **Zero-Block I/O**: Use async drivers such as \`asyncpg\` and \`aiokafka\`.\n2. **Idempotency**: Store idempotency keys in Redis with strict TTLs.\n3. **Dead Letter Queues**: Route faulty messages safely to prevent partition choking.`,
    contentFa: `### مقدمه\nمهندسی سیستم‌های توزیع‌شده نیازمند تفکیک بار پردازشی از رویدادهای آنی است. در سیستم‌های پرترافیک مدرن، ترکیب FastAPI با Apache Kafka توان گذردهی فوق‌العاده‌ای ارائه می‌دهد.\n\n### اصول کلیدی\n۱. **ورودی/خروجی بدون مسدودی**: استفاده از درایورهای ناهمگام مانند \`asyncpg\`.\n۲. **عملیات شناسا (Idempotency)**: ثبت کلیدهای تکرارناپذیر در Redis.\n۳. **صف پیام‌های ناموفق (DLQ)**: هدایت امن خطاهای پردازش پیام برای حفظ پایداری پارتیشن‌ها.`,
    coverImage: "/images/blog/microservices.jpg",
    tags: ["Python", "FastAPI", "Kafka", "Distributed Systems", "Architecture"],
    published: true,
    readingTime: "6 min read",
  },
  {
    slug: "integrating-mcp-ai-agents-into-enterprise-erp",
    titleEn: "Integrating Model Context Protocol (MCP) into Legacy ERP Backends",
    titleFa: "تلفیق پروتکل کانتکست مدل (MCP) در پلتفرم‌های سازمانی و سیستم‌های ERP",
    summaryEn: "How to safely expose relational schemas and accounting ledger RPC tools to autonomous AI agents using the Anthropic Model Context Protocol standard.",
    summaryFa: "چگونگی ایمن‌سازی و فراهم‌سازی ابزارهای دسترسی اسناد مالی و جداول رابطه‌ای به ایجنت‌های هوش مصنوعی با استفاده از پروتکل استاندارد MCP.",
    contentEn: `### The MCP Revolution\nAutonomous AI agents represent the future of ERP workflow automation. With Model Context Protocol (MCP), your enterprise backend becomes an interactive tool registry that LLMs can query deterministically.\n\n### Security & Sandboxing\n- Read-only replicas for analytical queries.\n- Dual-signature authorization for financial state mutations.`,
    contentFa: `### تحول ناشی از پروتکل MCP\nایجنت‌های خودکار آینده اتوماسیون سیستم‌های مدیریت منابع سازمانی (ERP) را رقم می‌زنند. پروتکل کانتکست مدل (MCP) به عنوان استانداردی باز، امکان اتصال ایمن مدل‌های زبانی به ابزارهای سیستمی را مهیا می‌سازد.\n\n### امنیت و جداسازی\n- استفاده از پایگاه داده فقط-خواندنی برای کوئری‌های تحلیلی.\n- اعتبارسنجی دو مرحله‌ای برای تراکنش‌های تغییر وضعیت مالی.`,
    coverImage: "/images/blog/mcp-agents.jpg",
    tags: ["AI", "MCP", "LLM", "ERP", "Python"],
    published: true,
    readingTime: "8 min read",
  },
];

export async function seedDatabase() {
  console.log("Seeding database with Amirhossein Omidi profile data...");

  // 1. Admin User
  const hashedPassword = await bcrypt.hash("AdminPass123!", 10);
  await prisma.adminUser.upsert({
    where: { email: "admin@amirhossein.dev" },
    update: {},
    create: {
      email: "admin@amirhossein.dev",
      name: "Amirhossein Omidi",
      passwordHash: hashedPassword,
      role: "ADMIN",
    },
  });

  // 2. Profile
  const existingProfile = await prisma.profile.findFirst();
  if (!existingProfile) {
    await prisma.profile.create({
      data: initialProfile,
    });
  }

  // 3. Skill Categories & Skills
  for (const cat of initialSkillCategories) {
    const category = await prisma.skillCategory.create({
      data: {
        nameEn: cat.nameEn,
        nameFa: cat.nameFa,
        order: cat.order,
      },
    });

    for (const skill of cat.skills) {
      await prisma.skill.create({
        data: {
          name: skill.name,
          level: skill.level,
          proficiency: skill.proficiency,
          iconKey: skill.iconKey,
          categoryId: category.id,
        },
      });
    }
  }

  // 4. Projects
  for (const proj of initialProjects) {
    await prisma.project.upsert({
      where: { slug: proj.slug },
      update: proj,
      create: proj,
    });
  }

  // 5. Experiences
  for (const exp of initialExperiences) {
    await prisma.experience.create({
      data: exp,
    });
  }

  // 6. Certifications
  for (const cert of initialCertifications) {
    await prisma.certification.create({
      data: cert,
    });
  }

  // 7. Articles
  for (const article of initialArticles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: article,
      create: article,
    });
  }

  console.log("Database seeded successfully!");
}

async function main() {
  try {
    await seedDatabase();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main();
}
