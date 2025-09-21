/**
 * Figma Design Tokens Utility
 * Easy-to-use functions for applying Figma design tokens
 */

import { designTokens } from "./design-tokens";

// Color utilities
export const figmaColors = {
  background: {
    primary: "bg-figma-background-primary",
    secondary: "bg-figma-background-secondary",
  },
  text: {
    primary: "text-figma-text-primary",
    secondary: "text-figma-text-secondary",
    tertiary: "text-figma-text-tertiary",
    header: "text-figma-text-header",
  },
  surface: {
    button: "bg-figma-surface-button",
    placeholder: "bg-figma-surface-placeholder",
  },
  border: {
    primary: "border-figma-border-primary",
  },
} as const;

// Typography utilities
export const figmaTypography = {
  heading:
    "text-figma-xs font-figma font-figma-regular text-figma-text-primary",
  body: "text-figma-base font-figma font-figma-regular text-figma-text-primary",
  bodyMedium:
    "text-figma-base font-figma font-figma-medium text-figma-text-primary",
  subtitle:
    "text-figma-base font-figma font-figma-regular text-figma-text-secondary",
  secondary:
    "text-figma-base font-figma font-figma-regular text-figma-text-tertiary",
  header: "text-sm font-figma font-figma-regular text-figma-text-header",
} as const;

// Spacing utilities
export const figmaSpacing = {
  xs: "p-figma-xs",
  sm: "p-figma-sm",
  md: "p-figma-md",
  lg: "p-figma-lg",
  xl: "p-figma-xl",
  "2xl": "p-figma-2xl",
  "3xl": "p-figma-3xl",
} as const;

// Border radius utilities
export const figmaRadius = {
  sm: "rounded-figma-sm",
  md: "rounded-figma-md",
} as const;

// Component-specific utilities
export const figmaComponents = {
  button:
    "bg-figma-surface-button text-figma-text-primary rounded-figma-sm px-3 py-1 text-sm font-figma",
  card: "rounded-figma-sm border border-figma-border-primary",
  divider: "border-t border-figma-border-primary",
} as const;

// Combined utilities for common patterns
export const figmaStyles = {
  // Section headings
  sectionHeading: figmaTypography.heading,

  // Body text
  bodyText: figmaTypography.body,

  // Subtitles
  subtitle: figmaTypography.subtitle,

  // Secondary text
  secondaryText: figmaTypography.secondary,

  // Buttons
  button: figmaComponents.button,

  // Cards
  card: figmaComponents.card,

  // Dividers
  divider: figmaComponents.divider,

  // Experience rows
  experienceRow: "border-b border-figma-border-primary py-6 md:py-8",

  // Logo containers
  logoContainer: "w-8 h-8 rounded-figma-sm bg-figma-surface-placeholder",
} as const;

// Type definitions
export type FigmaColorKeys = keyof typeof figmaColors;
export type FigmaTypographyKeys = keyof typeof figmaTypography;
export type FigmaSpacingKeys = keyof typeof figmaSpacing;
export type FigmaRadiusKeys = keyof typeof figmaRadius;
export type FigmaComponentKeys = keyof typeof figmaComponents;
export type FigmaStyleKeys = keyof typeof figmaStyles;
