import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#132440",
        "ted-red": "#eb0028",
        "text-color": "var(--text-color)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        ted: {
          red: "var(--ted-red)",
          "dark-red": "var(--ted-dark-red)",
          "official-red": "var(--ted-official-red)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
