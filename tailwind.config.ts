import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
} satisfies Config;
