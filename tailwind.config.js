/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  // Preflight is disabled so Tailwind's reset does not fight the hand-authored
  // design system in styles.css. Utilities (e.g. fixed/inset-0/-z-10) still work.
  corePlugins: { preflight: false },
  theme: {
    extend: {},
  },
  plugins: [],
}
