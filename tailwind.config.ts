import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";
import { designTokens } from "./lib/design-tokens";
const { fontFamily } = require("tailwindcss/defaultTheme");

// Generate a comprehensive spacing scale
const generateSpacing = (): { [key: string]: string } => {
  const spacing: { [key: string]: string } = {};
  // Base spacing units (4px increments)
  for (let i = 0; i <= 64; i++) {
    spacing[`${i}`] = `${i * 4}px`;
  }
  // Add some larger spacing values
  spacing["80"] = "320px";
  spacing["96"] = "384px";
  spacing["128"] = "512px";
  return spacing;
};

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      // Color palette - Figma Design Tokens
      colors: {
        // Figma design tokens
        figma: {
          background: {
            primary: designTokens.colors.background.primary,
            secondary: designTokens.colors.background.secondary,
          },
          text: {
            primary: designTokens.colors.text.primary,
            secondary: designTokens.colors.text.secondary,
            tertiary: designTokens.colors.text.tertiary,
            header: designTokens.colors.text.header,
          },
          surface: {
            button: designTokens.colors.surface.button,
            placeholder: designTokens.colors.surface.placeholder,
          },
          border: {
            primary: designTokens.colors.border.primary,
          },
        },
        // Legacy colors (keeping for compatibility)
        primary: {
          DEFAULT: "#F91414",
          light: "#FF4D4D",
          dark: "#D40000",
        },
        secondary: {
          DEFAULT: "#FFFF00",
          light: "#FFFF66",
          dark: "#CCCC00",
        },
        neutral: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
          950: "#030712",
        },
        background: {
          light: "#FFFFFF",
          DEFAULT: "#F1F1F1",
          dark: "#121212",
        },
        text: {
          light: "#F1F1F1",
          DEFAULT: "#000000",
          dark: "#6B7280",
        },
      },
      // Spacing scale
      spacing: {
        ...generateSpacing(),
        // Figma design tokens
        "figma-xs": designTokens.spacing.xs,
        "figma-sm": designTokens.spacing.sm,
        "figma-md": designTokens.spacing.md,
        "figma-lg": designTokens.spacing.lg,
        "figma-xl": designTokens.spacing.xl,
        "figma-2xl": designTokens.spacing["2xl"],
        "figma-3xl": designTokens.spacing["3xl"],
      },
      // Typography
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        serif: ["var(--font-serif)", ...fontFamily.serif],
        mono: ["IBM Plex Mono", ...fontFamily.mono],
        // Figma design tokens
        figma: [designTokens.typography.fontFamily.primary, ...fontFamily.sans],
      },
      fontSize: {
        // Figma design tokens
        "figma-xs": [
          designTokens.typography.fontSize.xs,
          { lineHeight: "14.52px" },
        ],
        "figma-base": [
          designTokens.typography.fontSize.base,
          { lineHeight: designTokens.typography.lineHeight.base },
        ],
        // Legacy text sizes
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
        // Figma design tokens
        "figma-regular": designTokens.typography.fontWeight.regular.toString(),
        "figma-medium": designTokens.typography.fontWeight.medium.toString(),
      },
      // Border radius
      borderRadius: {
        // Figma design tokens
        "figma-sm": designTokens.borderRadius.sm,
        "figma-md": designTokens.borderRadius.md,
        // Legacy border radius
        none: "0",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      // Shadows
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        none: "none",
      },
      // Z-index
      zIndex: {
        "0": "0",
        "10": "10",
        "20": "20",
        "30": "30",
        "40": "40",
        "50": "50",
        auto: "auto",
      },
      // Transitions
      transitionDuration: {
        "75": "75ms",
        "100": "100ms",
        "150": "150ms",
        "200": "200ms",
        "300": "300ms",
        "500": "500ms",
        "700": "700ms",
        "1000": "1000ms",
      },
      transitionTimingFunction: {
        linear: "linear",
        in: "cubic-bezier(0.4, 0, 1, 1)",
        out: "cubic-bezier(0, 0, 0.2, 1)",
        "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        "16": "repeat(16, minmax(0, 1fr))",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }: PluginAPI) {
      const newUtilities = {
        ".safe-top": {
          paddingTop: "env(safe-area-inset-top)",
        },
        ".safe-bottom": {
          paddingBottom: "env(safe-area-inset-bottom)",
        },
        ".safe-left": {
          paddingLeft: "env(safe-area-inset-left)",
        },
        ".safe-right": {
          paddingRight: "env(safe-area-inset-right)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
} satisfies Config;

export default config;
