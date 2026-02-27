import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        black: "#1d1d1f",
        light: "#f5f5f7"
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'sans-serif']
      },
      borderRadius: {
        card: "18px",
        btn: "12px",
        pill: "980px"
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,0.06)",
        modal: "0 8px 40px rgba(0,0,0,0.12)"
      }
    }
  },
  plugins: []
};

export default config;
