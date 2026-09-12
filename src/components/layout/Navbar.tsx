"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, Menu, X, ShieldCheck } from "lucide-react";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";

interface NavbarProps {
  locale: string;
  labels: {
    home: string;
    projects: string;
    blog: string;
    admin: string;
  };
}

export function Navbar({ locale, labels }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: `/${locale}`, label: labels.home },
    { href: `/${locale}/projects`, label: labels.projects },
    { href: `/${locale}/blog`, label: labels.blog },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "bg-[#070405]/90 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl shadow-black/80 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with Sleek Monochrome Minimal Style */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-white/20 to-white/5 border border-white/20 flex items-center justify-center p-0.5 shadow-lg shadow-black/50 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#0e0f14] rounded-[14px] flex items-center justify-center">
              <Terminal className="w-5 h-5 text-white group-hover:rotate-6 transition-transform" />
            </div>
          </div>
          <div>
            <div className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
              <span>Amirhossein Omidi</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-sm shadow-white" />
            </div>
            <div className="text-[11px] text-slate-400 font-mono tracking-wide">
              Systems Architect
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] border border-white/[0.1] rounded-full p-1.5 backdrop-blur-xl shadow-lg shadow-black/40">
          {navItems.map((item) => {
            const isActive =
              item.href === `/${locale}`
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white text-black shadow-md shadow-white/20 font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions (Locale, Theme, Admin link) */}
        <div className="hidden sm:flex items-center gap-2.5">
          <LocaleSwitcher currentLocale={locale} />
          <ThemeToggle />
          <Link
            href={`/${locale}/admin/login`}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/[0.08] border border-transparent hover:border-white/20"
            title={labels.admin}
          >
            <ShieldCheck className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-4 pb-6 mt-2 mx-3 rounded-2xl bg-[#0e0f14]/98 border border-white/15 backdrop-blur-2xl flex flex-col gap-3 shadow-2xl">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <LocaleSwitcher currentLocale={locale} />
            <Link
              href={`/${locale}/admin/login`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1 px-3 py-2 rounded-lg bg-white/10 border border-white/15"
            >
              <ShieldCheck className="w-4 h-4" />
              {labels.admin}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
