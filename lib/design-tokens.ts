/**
 * Design Tokens extracted from Figma
 * Based on the Startpage design
 */

export const designTokens = {
  colors: {
    // Background colors
    background: {
      primary: "#0c0a09",
      secondary: "#1c1917",
    },

    // Text colors
    text: {
      primary: "#EDEDEC",
      secondary: "#A1A09A",
      tertiary: "#79716b",
      header: "#fafaf9", // Header text color from Figma
    },

    // Surface colors
    surface: {
      button: "#1c1917",
      placeholder: "#d9d9d9",
    },

    // Border colors
    border: {
      primary: "#1c1917",
    },
  },

  typography: {
    fontFamily: {
      primary: "Inter",
    },

    fontSize: {
      xs: "12px",
      base: "16px",
    },

    fontWeight: {
      regular: 400,
      medium: 500, // Medium weight from Figma
    },

    lineHeight: {
      base: "19.36px",
    },

    // Typography scales
    heading: {
      fontFamily: "Inter",
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "14.52px",
      color: "#ffffff",
    },

    body: {
      fontFamily: "Inter",
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "19.36px",
      color: "#ffffff",
    },

    bodyMedium: {
      fontFamily: "Inter",
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "19.36px",
      color: "#ffffff",
    },

    subtitle: {
      fontFamily: "Inter",
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "19.36px",
      color: "#f5f5f4",
    },

    secondary: {
      fontFamily: "Inter",
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "19.36px",
      color: "#79716b",
    },

    header: {
      fontFamily: "Inter",
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "16.94px",
      color: "#fafaf9",
    },
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
    "3xl": "64px",
  },

  sizing: {
    logo: {
      sm: "32px",
      md: "48px",
    },
  },

  borderRadius: {
    sm: "4px",
    md: "8px",
  },

  // Component-specific tokens
  components: {
    button: {
      background: "#1c1917",
      color: "#ffffff",
      borderRadius: "4px",
      padding: "8px 12px",
      fontSize: "14px",
    },

    card: {
      borderRadius: "4px",
      border: "1px solid #1c1917",
    },

    divider: {
      color: "#1c1917",
      height: "1px",
    },
  },
} as const;

// Type definitions for better TypeScript support
export type DesignTokens = typeof designTokens;
export type ColorTokens = DesignTokens["colors"];
export type TypographyTokens = DesignTokens["typography"];
export type SpacingTokens = DesignTokens["spacing"];
