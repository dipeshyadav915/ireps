import {
  Urbanist as FontUrbanist,
  Fira_Code as FontMono,
  Inter as FontSans,
  Playfair_Display,
} from 'next/font/google';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const fontUrbanist = FontUrbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
});
export const playfair = Playfair_Display({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-playfair',
});
