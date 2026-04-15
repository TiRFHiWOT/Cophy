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
