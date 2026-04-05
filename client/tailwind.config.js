/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        space: '#F8F3E1',
        white: '#2F3115',
        'civic-blue': '#AEB784',
        'civic-green': '#41431B',
        'civic-orange': '#E3DBBB',
        'civic-red': '#41431B',
        'civic-purple': '#AEB784',
        glass: {
          light: 'rgba(248, 243, 225, 0.76)',
          medium: 'rgba(227, 219, 187, 0.74)',
          heavy: 'rgba(174, 183, 132, 0.32)',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      backdropBlur: {
        glass: '20px',
        heavy: '40px',
      },
      borderRadius: {
        glass: '20px',
        pill: '100px',
      },
      boxShadow: {
        glass: '0 18px 35px -24px rgba(47, 49, 21, 0.55), 0 3px 8px -6px rgba(47, 49, 21, 0.28), inset 0 1px 0 rgba(248, 243, 225, 0.55)',
        'glass-hover': '0 24px 40px -24px rgba(47, 49, 21, 0.62), 0 6px 12px -8px rgba(47, 49, 21, 0.3), inset 0 1px 0 rgba(248, 243, 225, 0.72)',
      },
      animation: {
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;