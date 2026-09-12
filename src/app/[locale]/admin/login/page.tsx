"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, ShieldAlert, ArrowRight, ArrowLeft } from "lucide-react";
import { TextField, Button } from "@mui/material";
import { GlassCard } from "@/components/ui/GlassCard";

export default function AdminLoginPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const [email, setEmail] = useState("admin@amirhossein.dev");
  const [password, setPassword] = useState("AdminPass123!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const isFa = locale === "fa";
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(isFa ? "نام کاربری یا کلمه عبور نادرست است" : "Invalid email or password");
      } else {
        router.push(`/${locale}/admin/dashboard`);
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center pt-28 pb-16 px-4">
      <div className="w-full max-w-md">
        <GlassCard className="!p-8 sm:!p-10" glow>
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto mb-4 text-rose-500 shadow-sm shadow-rose-500/20">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {isFa ? "ورود به پنل مدیریت CMS" : "Admin Panel Authentication"}
            </h1>
            <p className="text-xs text-rose-300/80 mt-1">
              {isFa
                ? "دسترسی مدیریت به مقالات، سیستم‌ها و تنظیمات پرتال"
                : "Secured credential portal for portfolio content"}
            </p>
          </div>

          {error && (
            <div className="p-3 mb-6 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-rose-200 mb-1.5">
                {isFa ? "پست الکترونیکی:" : "Admin Email:"}
              </label>
              <TextField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                size="small"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(0,0,0,0.4)",
                    borderRadius: "12px",
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,0,85,0.25)" },
                    "&:hover fieldset": { borderColor: "rgba(255,0,85,0.6)" },
                  },
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-rose-200 mb-1.5">
                {isFa ? "کلمه عبور:" : "Password:"}
              </label>
              <TextField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                size="small"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(0,0,0,0.4)",
                    borderRadius: "12px",
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,0,85,0.25)" },
                    "&:hover fieldset": { borderColor: "rgba(255,0,85,0.6)" },
                  },
                }}
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                endIcon={<ArrowIcon className="w-4 h-4" />}
                sx={{
                  bgcolor: "#ff0055",
                  py: 1.3,
                  fontWeight: 700,
                  boxShadow: "0 10px 25px -5px rgba(255,0,85,0.5)",
                  "&:hover": { bgcolor: "#e1004a", boxShadow: "0 10px 30px -5px rgba(255,0,85,0.7)" },
                }}
              >
                {loading
                  ? isFa
                    ? "در حال ورود..."
                    : "Authenticating..."
                  : isFa
                  ? "ورود به داشبورد"
                  : "Sign In"}
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-rose-500/20 text-center">
            <div className="text-[11px] font-mono text-slate-400">
              Demo Credentials Pre-filled: <br />
              <span className="text-rose-400 font-bold">admin@amirhossein.dev</span> / <span className="text-rose-400 font-bold">AdminPass123!</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
