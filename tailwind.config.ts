import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#060A24",
          900: "#0C1446", // Deep Navy
          800: "#131F63",
          700: "#1C2E85",
        },
        academic: {
          DEFAULT: "#2B5C92", // Academic Blue
          50: "#F0F6FC",
          100: "#DDEAF7",
          200: "#BED7F0",
          300: "#8FBAE4",
          400: "#5B96D3",
          500: "#2B5C92",
          600: "#224A75",
          700: "#1B395B",
          800: "#142840",
          900: "#0D1A2A",
        },
        ice: {
          DEFAULT: "#B3CDE0", // Soft Ice Blue
          50: "#F5F9FC",
          100: "#EAF2F8",
          200: "#D5E5F2",
          300: "#B3CDE0",
          400: "#86B0CE",
          500: "#5F92BD",
        },
        glass: {
          card: "rgba(255, 255, 255, 0.06)",
          "card-hover": "rgba(255, 255, 255, 0.10)",
          border: "rgba(255, 255, 255, 0.12)",
          "border-bright": "rgba(255, 255, 255, 0.25)",
          button: "rgba(43, 92, 146, 0.5)",
          "button-hover": "rgba(43, 92, 146, 0.75)",
          secondary: "rgba(179, 205, 224, 0.15)",
          "secondary-hover": "rgba(179, 205, 224, 0.25)",
          surface: "rgba(12, 20, 70, 0.65)",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "glass-sm": "0 4px 16px 0 rgba(0, 0, 0, 0.25)",
        "glass-lg": "0 12px 48px 0 rgba(0, 0, 0, 0.5)",
        "glow-blue": "0 0 24px rgba(43, 92, 146, 0.45)",
        "glow-ice": "0 0 20px rgba(179, 205, 224, 0.35)",
        "glow-green": "0 0 20px rgba(52, 211, 153, 0.35)",
        "glow-amber": "0 0 20px rgba(251, 191, 36, 0.35)",
        "glow-red": "0 0 20px rgba(248, 113, 113, 0.35)",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
