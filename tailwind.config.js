const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['poppins', 'ui-sans-serif'],
      'sans-2': ['Montserrat', 'sans-serif'],
      // 'serif': ['ui-serif', 'Georgia', ...],
      // 'mono': ['ui-monospace', 'SFMono-Regular', ...],
      // 'display': ['Oswald', ...],
      // 'body': ['"Open Sans"', ...],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      blue: colors.blue,
      slate: colors.slate,
      red: colors.red,
      // primary: '#BD00FF',
      primary: {
        // dark : '#8200FF',
        // light: '#CE40FF',
        // light: '#DA70FF',
        DEFAULT: '#BD00FF',
        dark: '#AA08E9',
      },
    },
    extend: {},
  },
  plugins: [],
};
