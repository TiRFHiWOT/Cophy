/**
 * Theme Configuration
 * Warm coffee-inspired design system for Archers Coffee
 *
 * This theme creates a warm, inviting coffee shop aesthetic using
 * browns, creams, and amber tones that evoke the feeling of
 * freshly roasted coffee beans.
 */

export const theme = {
  colors: {
    // Primary: Rich amber/orange (coffee roast tones)
    primary: {
      light: "hsl(25, 95%, 53%)", // Main primary color
      dark: "hsl(25, 90%, 48%)", // Darker variant for hover states
      lightest: "hsl(25, 95%, 90%)", // Lightest for backgrounds
    },
    // Secondary: Warm browns
    secondary: {
      light: "#A0826D", // Lighter warm brown
      main: "#8B6F47", // Main warm brown
      dark: "#6D4C41", // Darker brown
    },
    // Accent: Deep coffee browns
    accent: {
      light: "#6D4C41",
      main: "#5D4037", // Deep coffee brown
      dark: "#4E342E", // Darkest brown
    },
    // Background: Cream/off-white tones
    background: {
      light: "#FAF8F5", // Lightest cream
      main: "#F5F1EB", // Main cream background
      dark: "#E8E3DB", // Slightly darker cream
    },
    // Text: Dark browns for readability
    text: {
      primary: "hsl(222.2, 84%, 4.9%)", // Dark brown/black
      secondary: "hsl(215.4, 16.3%, 46.9%)", // Muted brown
      muted: "hsl(215.4, 16.3%, 46.9%)", // Muted text
    },
  },
  typography: {
    fontFamily: {
      sans: "var(--font-geist-sans)",
      mono: "var(--font-geist-mono)",
    },
    fontSize: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
      "6xl": "3.75rem", // 60px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    // 4px base unit system
    1: "0.25rem", // 4px
    2: "0.5rem", // 8px
    3: "0.75rem", // 12px
    4: "1rem", // 16px
    6: "1.5rem", // 24px
    8: "2rem", // 32px
    12: "3rem", // 48px
    16: "4rem", // 64px
  },
  borderRadius: {
    none: "0",
    sm: "0.25rem", // 4px
    base: "0.5rem", // 8px
    md: "0.5rem", // 8px
    lg: "0.75rem", // 12px
    xl: "1rem", // 16px
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  transitions: {
    fast: "150ms",
    base: "300ms",
    slow: "500ms",
  },
} as const;

// Export individual sections for easier imports
export const colors = theme.colors;
export const typography = theme.typography;
export const spacing = theme.spacing;
export const borderRadius = theme.borderRadius;
export const shadows = theme.shadows;
export const breakpoints = theme.breakpoints;
export const transitions = theme.transitions;
