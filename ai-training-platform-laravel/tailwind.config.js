/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      colors: {
        // Brand colors from CSS variables
        'oxford-blue': 'var(--color-oxford-blue)',
        'ultramarine': 'var(--color-ultramarine)',
        'light-magenta': 'var(--color-light-magenta)',
        'sage': 'var(--color-sage)',
        'off-white': 'var(--color-off-white)',
        'dark-grey': 'var(--color-dark-grey)',
        // Accent colors
        'accent-magenta': {
          50: 'var(--accent-magenta-50)',
          100: 'var(--accent-magenta-100)',
          200: 'var(--accent-magenta-200)',
          300: 'var(--accent-magenta-300)',
          400: 'var(--accent-magenta-400)',
          500: 'var(--accent-magenta-500)',
          600: 'var(--accent-magenta-600)',
          700: 'var(--accent-magenta-700)',
          800: 'var(--accent-magenta-800)',
          900: 'var(--accent-magenta-900)',
        },
        'accent-sage': {
          50: 'var(--accent-sage-50)',
          100: 'var(--accent-sage-100)',
          200: 'var(--accent-sage-200)',
          300: 'var(--accent-sage-300)',
          400: 'var(--accent-sage-400)',
          500: 'var(--accent-sage-500)',
          600: 'var(--accent-sage-600)',
          700: 'var(--accent-sage-700)',
          800: 'var(--accent-sage-800)',
          900: 'var(--accent-sage-900)',
        },
        // Role-specific accent colors
        'accent-developers': 'var(--accent-magenta-500)',
        'accent-designers': 'var(--accent-magenta-500)',
        'accent-project-managers': 'var(--accent-sage-500)',
        'accent-content-creators': 'var(--accent-magenta-500)',
        'accent-sales-business': 'var(--accent-sage-500)',
      },
    },
  },
  plugins: [],
}

