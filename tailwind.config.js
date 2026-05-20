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
          50: "#FBF6EF",
          100: "#F6EFE6",
          200: "#EFE5D6",
          300: "#E6D7C0",
        },
        espresso: {
          DEFAULT: "#3A2A20",
          light: "#5C443A",
          dark: "#2A1D15",
        },
        peach: {
          50: "#FDEFE7",
          100: "#FBE2D2",
          200: "#F7C9AE",
        },
        softpink: {
          50: "#FCEAE4",
          100: "#F8D6CC",
        },
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: "0 8px 30px -10px rgba(58, 42, 32, 0.15)",
        card: "0 4px 20px -6px rgba(58, 42, 32, 0.08)",
        phone: "0 30px 60px -20px rgba(58, 42, 32, 0.35)",
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
