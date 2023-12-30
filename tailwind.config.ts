import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        StarJedi: ["var(--font-StarJedi)"],
        StarJHol: ["var(--font-StarJHol)"],
        StarJOut: ["var(--font-StarJOut)"],
      },
    },
  },
  plugins: [],
};
export default config;
