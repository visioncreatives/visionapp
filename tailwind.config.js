/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FFFFFF",
          100: "#F5F5F5",
          200: "#E0E0E0",
          300: "#C8C8C8",
        },
        espresso: {
          DEFAULT: "#2A2A2A",
          light: "#5A5A5A",
          dark: "#1A1A1A",
        },
        vision: {
          blue: "#6B8FBF",
          "blue-light": "#E2EAF4",
          "blue-mid": "#C4D4E8",
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: "0 8px 30px -10px rgba(0,0,0,0.10)",
        card: "0 2px 16px -4px rgba(0,0,0,0.07)",
      },
      letterSpacing: {
        vision: '0.32em',
        'vision-sm': '0.15em',
      },
    },
  },
  plugins: [],
}
