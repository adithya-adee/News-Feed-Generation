import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Ensure this CSS variable is defined
        foreground: "var(--foreground)", // Ensure this CSS variable is defined
      },
      borderRadius: {
        lg: "var(--radius)", // Ensure this CSS variable is defined
        md: "calc(var(--radius) - 2px)", // Ensure this CSS variable is defined
        sm: "calc(var(--radius) - 4px)", // Ensure this CSS variable is defined
      },
    },
  },
  plugins: [require("tailwindcss-animate")], // Ensure plugin is installed
};

export default config;
