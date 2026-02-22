import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#050505',
        ember: '#d62828',
        neon: '#ffd60a'
      }
    }
  },
  plugins: []
} satisfies Config;
