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
          50: "#FDFAF5",
          100: "#F8F2E8",
          200: "#EFE5D4",
          300: "#E2D0B8",
        },
        espresso: {
          DEFAULT: "#2C1A0E",
          light: "#4A2E1A",
          dark: "#1A0D06",
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: "0 8px 30px -10px rgba(44,26,14,0.12)",
        card: "0 2px 16px -4px rgba(44,26,14,0.08)",
      },
      letterSpacing: {
        vision: '0.32em',
        'vision-sm': '0.15em',
      },
    },
  },
  plugins: [],
}
