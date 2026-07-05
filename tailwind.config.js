/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0F14",
        foreground: "#EDE7D9",
        panel: "#0F172A",
        surface: "#111827",
        amber: {
          DEFAULT: "#F5B84A",
          deep: "#C9922F"
        },
        muted: "#94A3B8",
        border: "#1E293B"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Fraunces', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
