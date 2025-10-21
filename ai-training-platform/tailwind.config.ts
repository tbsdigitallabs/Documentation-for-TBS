import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Official TBS Brand Colors via CSS variables
        'oxford-blue': 'var(--color-oxford-blue)',
        'ultramarine': 'var(--color-ultramarine)',
        'off-white': 'var(--color-off-white)',
        'dark-grey': 'var(--color-dark-grey)',
        'light-magenta': 'var(--color-light-magenta)',
        'sage': 'var(--color-sage)',

        // Semantic Design Tokens mapped to CSS variables
        surface: {
          primary: 'var(--color-white)',
          secondary: 'var(--color-gray-50)',
          tertiary: 'var(--color-gray-100)',
          hero: 'var(--color-gray-50)',
          card: 'var(--color-white)',
          header: 'var(--color-white)',
        },
        content: {
          primary: 'var(--color-text-primary-light)',
          secondary: 'var(--color-text-secondary-light)',
          tertiary: 'var(--color-text-tertiary-light)',
          inverse: 'var(--color-white)',
        },
        border: {
          primary: 'var(--color-gray-200)',
          secondary: 'var(--color-gray-300)',
          accent: 'var(--color-light-magenta)',
        },
        accent: {
          developers: 'var(--color-oxford-blue)',
          designers: 'var(--color-light-magenta)',
          'project-managers': 'var(--color-sage)',
          'content-creators': 'var(--color-light-magenta)',
          'sales-business': 'var(--color-sage)',
        },

        // Legacy color mappings for gradual migration
        navy: {
          primary: 'var(--color-oxford-blue)',
          light: 'var(--color-ultramarine)',
          dark: 'var(--color-oxford-blue)',
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      fontFamily: {
        heading: ["Funnel Display", "system-ui", "sans-serif"],
        body: ["Rethink Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
      },
      spacing: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        32: "8rem",
      },
      borderRadius: {
        sm: "0.125rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        'brand-glow': "0 0 20px rgba(213, 110, 237, 0.3)",
        'sage-glow': "0 0 20px rgba(97, 189, 186, 0.3)",
      },
      backgroundImage: {
        // Light mode gradients via palette/variables
        'gradient-surface-light': 'linear-gradient(135deg, var(--color-gray-50) 0%, var(--color-gray-100) 100%)',
        'gradient-hero-light': 'linear-gradient(135deg, var(--color-gray-50) 0%, var(--color-gray-200) 50%, var(--color-gray-300) 100%)',
        'gradient-card-light': 'linear-gradient(135deg, var(--color-white) 0%, var(--color-gray-50) 100%)',

        // Dark/brand gradients via variables
        'gradient-brand': 'linear-gradient(135deg, var(--color-oxford-blue) 0%, var(--color-ultramarine) 100%)',
        'gradient-hero': 'linear-gradient(135deg, var(--color-oxford-blue) 0%, var(--color-ultramarine) 50%, var(--color-light-magenta) 100%)',
        'gradient-developers': 'linear-gradient(135deg, var(--color-oxford-blue) 0%, var(--color-ultramarine) 100%)',
        'gradient-designers': 'linear-gradient(135deg, var(--color-oxford-blue) 0%, var(--color-light-magenta) 100%)',
        'gradient-project-managers': 'linear-gradient(135deg, var(--color-ultramarine) 0%, var(--color-sage) 100%)',
        'gradient-content-creators': 'linear-gradient(135deg, var(--color-light-magenta) 0%, rgba(213, 110, 237, 0.7) 100%)',
        'gradient-sales': 'linear-gradient(135deg, var(--color-oxford-blue) 0%, var(--color-sage) 100%)',
        'gradient-progress': 'linear-gradient(90deg, var(--color-oxford-blue) 0%, var(--color-sage) 100%)',
      },
      transitionDuration: {
        fast: "150ms",
        normal: "250ms",
        slow: "350ms",
      },
      zIndex: {
        dropdown: "1000",
        sticky: "1020",
        fixed: "1030",
        "modal-backdrop": "1040",
        modal: "1050",
        popover: "1060",
        tooltip: "1070",
      },
    },
  },
  plugins: [],
};

export default config;
