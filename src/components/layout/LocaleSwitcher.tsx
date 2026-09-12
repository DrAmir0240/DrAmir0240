"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import { Button } from "@mui/material";

export function LocaleSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const targetLocale = currentLocale === "en" ? "fa" : "en";
    const segments = pathname.split("/");
    segments[1] = targetLocale;
    const newPath = segments.join("/") || `/${targetLocale}`;
    router.push(newPath);
  };

  return (
    <Button
      onClick={toggleLocale}
      size="small"
      startIcon={<Languages className="w-4 h-4 text-white" />}
      sx={{
        color: "#ffffff",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        px: 1.5,
        py: 0.6,
        fontSize: "0.85rem",
        borderRadius: "12px",
        backdropFilter: "blur(12px)",
        "&:hover": {
          bgcolor: "rgba(255, 255, 255, 0.1)",
          borderColor: "rgba(255, 255, 255, 0.4)",
          boxShadow: "0 0 15px rgba(255, 255, 255, 0.15)",
        },
      }}
    >
      {currentLocale === "en" ? "فارسی" : "English"}
    </Button>
  );
}

export default LocaleSwitcher;
