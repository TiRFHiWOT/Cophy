// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'cophy-amber': 'hsl(25, 95%, 53%)',
        'cophy-forest': 'hsl(135, 35%, 20%)',
        'cophy-earth': 'hsl(30, 25%, 55%)',
        'cophy-paper': 'hsl(30, 20%, 97%)',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'export': '0.5rem',
      }
    },
  },
}
