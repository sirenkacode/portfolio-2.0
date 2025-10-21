/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Major Mono Display"', "monospace"],
        display: ['"Major Mono Display"', "monospace"],
        sans: ['"Major Mono Display"', "monospace"],
      },
    },
  },
  plugins: [],
};
