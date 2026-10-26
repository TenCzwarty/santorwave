import { type Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        "ms-sans-serif": "var(--ms-sans-serif)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        // Win95 theme-aware colors
        theme: {
          accent: "var(--theme-accent)",
          "accent-hover": "var(--theme-accent-hover)",
          highlight: "var(--theme-highlight)",
          surface: "var(--theme-surface)",
          "surface-alt": "var(--theme-surface-alt)",
          "text-primary": "var(--theme-text-primary)",
          "text-secondary": "var(--theme-text-secondary)",
          "text-muted": "var(--theme-text-muted)",
          glass: "var(--theme-glass)",
          "glass-hover": "var(--theme-glass-hover)",
          "glass-border": "var(--theme-glass-border)",
          // Contrasting icon colors
          "icon-pink": "var(--theme-icon-pink)",
          "icon-cyan": "var(--theme-icon-cyan)",
          "icon-purple": "var(--theme-icon-purple)",
          "icon-orange": "var(--theme-icon-orange)",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
