"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { IconButton } from "@mui/material";
import { useAppTheme } from "@/components/theme/ThemeRegistry";

export function ThemeToggle() {
  const { mode, toggleTheme } = useAppTheme();
  const isDark = mode === "dark";

  return (
    <IconButton
      onClick={toggleTheme}
      size="small"
      sx={{
        color: "#ffffff",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        p: 1,
        borderRadius: "12px",
        backdropFilter: "blur(12px)",
        transition: "all 0.3s ease",
        "&:hover": {
          bgcolor: "rgba(255, 255, 255, 0.1)",
          borderColor: "rgba(255, 255, 255, 0.4)",
          boxShadow: "0 0 15px rgba(255, 255, 255, 0.15)",
          transform: "rotate(15deg)",
        },
      }}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-300" />
      ) : (
        <Moon className="w-4 h-4 text-white" />
      )}
    </IconButton>
  );
}

export default ThemeToggle;
