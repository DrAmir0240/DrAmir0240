import React from "react";
import { Send, Terminal } from "lucide-react";

export function Footer({ locale }: { locale: string }) {
  const currentYear = new Date().getFullYear();
  const isFa = locale === "fa";

  return (
    <footer className="relative border-t border-white/[0.08] mt-24 py-12 bg-[#070405]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/[0.15] flex items-center justify-center shadow-sm">
            <Terminal className="w-4 h-4 text-white" />
          </div>
          <div className="text-sm text-slate-400">
            © {currentYear} Amirhossein Omidi.{" "}
            {isFa
              ? "کلیه حقوق برای امیرحسین امیدی محفوظ است."
              : "Crafted with Next.js 14, Systems Architecture & Liquid Glass."}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-white hover:border-white/30 hover:bg-white/[0.08] transition-all font-mono text-xs"
            title="GitHub"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-white hover:border-white/30 hover:bg-white/[0.08] transition-all font-mono text-xs"
            title="LinkedIn"
          >
            LinkedIn
          </a>
          <a
            href="https://t.me"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-white hover:border-white/30 hover:bg-white/[0.08] transition-all"
            title="Telegram"
          >
            <Send className="w-4 h-4 text-white" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
