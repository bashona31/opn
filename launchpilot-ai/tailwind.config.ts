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
        primary: {
          DEFAULT: "#FF4FD8",
          50: "#FFF0FB",
          100: "#FFE0F7",
          200: "#FFD6F7",
          300: "#FFB6F2",
          400: "#FF7AE6",
          500: "#FF4FD8",
          600: "#E639BF",
          700: "#CC29A8",
          800: "#991F7E",
          900: "#661554",
        },
        background: "#FFF8FC",
        card: "#FFFFFF",
        foreground: "#111827",
        muted: {
          DEFAULT: "#6B7280",
          foreground: "#6B7280",
        },
        border: "#FFE0F7",
      },
      borderRadius: {
        xl: "16px",
        "2xl": "24px",
        "3xl": "32px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 60px rgba(255, 79, 216, 0.15)",
        "glow-lg": "0 0 120px rgba(255, 79, 216, 0.2)",
        card: "0 4px 40px rgba(0, 0, 0, 0.04)",
        "card-hover": "0 8px 60px rgba(255, 79, 216, 0.1)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "gradient": "gradient 8s ease infinite",
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
