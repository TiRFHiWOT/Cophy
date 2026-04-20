/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'lot-amber': 'hsl(25, 95%, 53%)',    // Roast/Precision
        'lot-forest': 'hsl(135, 35%, 20%)',  // Industrial/Origin
        'lot-earth': 'hsl(30, 25%, 55%)',    // Technical Data
        'lot-paper': 'hsl(30, 20%, 97%)',    // Premium Background
      },


      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'serif'], // Brand Heritage
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],        // Technical UI
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'], // Industrial IDs
      },
      borderRadius: {
        'export': '0.5rem'
      },
    },
  },
  plugins: [],
}
