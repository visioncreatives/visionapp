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
        // Pastel palette
        blush:   { DEFAULT: "#F2C4C4", light: "#FBE9E9", dark: "#C47A7A" },
        sage:    { DEFAULT: "#B8D4B8", light: "#E6F0E6", dark: "#5A8A5A" },
        sky:     { DEFAULT: "#B8D4E8", light: "#E2EEF6", dark: "#4A7A9B" },
        butter:  { DEFAULT: "#F0DFA0", light: "#FAF4D6", dark: "#8A7030" },
        lilac:   { DEFAULT: "#C8B8E0", light: "#EDE6F5", dark: "#6A4A9B" },
        peach:   { DEFAULT: "#F2C4A0", light: "#FBE9D6", dark: "#9B5A30" },
        mint:    { DEFAULT: "#A8D8C8", light: "#D6EEE8", dark: "#2A7A62" },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft:  "0 8px 30px -10px rgba(44,26,14,0.12)",
        card:  "0 2px 16px -4px rgba(44,26,14,0.08)",
        phone: "0 30px 60px -15px rgba(44,26,14,0.40)",
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      letterSpacing: {
        vision: '0.32em',
        'vision-sm': '0.15em',
      },
    },
  },
  plugins: [],
}
