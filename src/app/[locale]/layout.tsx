import React from "react";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ThemeRegistry } from "@/components/theme/ThemeRegistry";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "@/app/globals.css";

export const metadata = {
  title: "Amirhossein Omidi | Senior Backend Engineer & Distributed Systems Architect",
  description:
    "Interactive 3D Portfolio & CMS of Amirhossein Omidi (امیرحسین امیدی). Specializing in high-throughput Python backends (FastAPI, Django), distributed microservices, and AI/MCP integrations.",
};

const locales = ["en", "fa"];

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale)) notFound();

  const messages = await getMessages({ locale });
  const isRtl = locale === "fa";

  const navLabels = {
    home: locale === "fa" ? "خانه" : "Home",
    projects: locale === "fa" ? "پروژه‌ها" : "Projects",
    blog: locale === "fa" ? "مقالات" : "Blog",
    admin: locale === "fa" ? "مدیریت" : "CMS Admin",
  };

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      data-theme="dark"
      suppressHydrationWarning
    >
      <body className="antialiased min-h-screen selection:bg-rose-600 selection:text-white">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeRegistry locale={locale}>
            <div className="flex flex-col min-h-screen relative overflow-hidden bg-[#070405]">
              <Navbar locale={locale} labels={navLabels} />
              <main className="flex-grow">{children}</main>
              <Footer locale={locale} />
            </div>
          </ThemeRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
