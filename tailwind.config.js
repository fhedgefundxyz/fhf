/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        body: ['Newsreader', 'Georgia', 'serif'],
        mono: ['Geist Mono', 'SF Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
