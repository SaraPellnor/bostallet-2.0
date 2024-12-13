/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  animation: {
    "spin-slow": "spin 2s linear infinite",
  },
  extend: {
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
      purple_2: "var(--purple-2)",
      yellow_1: "var(--yellow-1)",
      purple_1: "var(--purple-1)",
      font: "var(--font)",
    },
  },
};
export const plugins = [];
