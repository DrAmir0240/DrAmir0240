import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: "#070405",
          900: "#0e0608",
          850: "#160a0d",
          800: "#200e12",
          700: "#32151c",
        },
        neonRed: {
          DEFAULT: "#ff0055",
          glow: "#ff1a6b",
          crimson: "#dc2626",
          dark: "#991b1b",
          deep: "#450a0a",
        },
        frost: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        persian: ["var(--font-vazirmatn)", "sans-serif"],
      },
      backdropBlur: {
        "2xl": "40px",
        "3xl": "64px",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "glow-slow": "glow 8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.4", filter: "blur(24px)" },
          "50%": { opacity: "0.8", filter: "blur(36px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
