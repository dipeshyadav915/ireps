import { heroui } from '@heroui/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'heroui-small': 'var(--heroui-box-shadow-small)',
      },

      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
        urbanist: ['var(--font-urbanist)'],
        playfair: ['var(--font-playfair)'],
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      layout: {},
      themes: {
        light: {
          colors: {
            background: '#ffffff',
            secondary: '#1a1a1a',
            primary: {
              DEFAULT: '#f36f48',
              foreground: '#f4f4f5',
            },
          },
        },
        dark: {
          colors: {
            background: '#1a1a1a',
            secondary: '#ffffff',
            primary: {
              DEFAULT: '#f36f48',
              foreground: '#27272a',
            },
          },
        },
      },
    }),
  ],
};
