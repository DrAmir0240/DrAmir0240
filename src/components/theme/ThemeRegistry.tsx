"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

type ThemeMode = "dark" | "light";

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "dark",
  toggleTheme: () => {},
  setMode: () => {},
});

export function ThemeRegistry({
  children,
  locale = "en",
}: {
  children: React.ReactNode;
  locale?: string;
}) {
  const [mode, setMode] = useState<ThemeMode>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") as ThemeMode | null;
    if (saved) {
      setMode(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextMode = mode === "dark" ? "light" : "dark";
    setMode(nextMode);
    localStorage.setItem("portfolio-theme", nextMode);
    document.documentElement.setAttribute("data-theme", nextMode);
  };

  const isRtl = locale === "fa";

  const theme = React.useMemo(
    () =>
      createTheme({
        direction: isRtl ? "rtl" : "ltr",
        palette: {
          mode,
          primary: {
            main: "#ffffff",
            light: "#ffffff",
            dark: "#e2e8f0",
            contrastText: "#070405",
          },
          secondary: {
            main: "#cbd5e1",
          },
          background: {
            default: mode === "dark" ? "#070405" : "#070405",
            paper: mode === "dark" ? "rgba(15, 17, 23, 0.85)" : "rgba(15, 17, 23, 0.85)",
          },
          text: {
            primary: "#ffffff",
            secondary: "#94a3b8",
          },
        },
        typography: {
          fontFamily: isRtl ? "var(--font-vazirmatn), sans-serif" : "var(--font-inter), sans-serif",
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
                borderRadius: 20,
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                textTransform: "none",
                fontWeight: 600,
              },
            },
          },
        },
      }),
    [mode, isRtl]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, setMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useAppTheme = () => useContext(ThemeContext);

export default ThemeRegistry;
