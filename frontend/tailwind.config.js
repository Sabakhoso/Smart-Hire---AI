/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // New colors
      colors: {
        cream: '#FBF7F1',
        brown: '#3D2B1F',
        gold: '#8B5A2B',
        dark: '#2E211A',
        muted: '#6B5847',
        beige: '#EDE1D3',
      },
      //  New fonts
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        body: ['Manrope', 'sans-serif'],
        button: ['Inter', 'sans-serif'],
      },
      //  Existing (keep as is)
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};