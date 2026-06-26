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
          50: "#F8F2E8",
          100: "#EFE5D4",
          200: "#D4C4A8",
          300: "#C4A888",
        },
        espresso: {
          DEFAULT: "#2C1A0E",
          light: "#5A4A3A",
          dark: "#1A0D06",
        },
        vision: {
          blue: "#6B8FBF",
          "blue-light": "#E2EAF4",
          "blue-mid": "#C4D4E8",
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
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
