/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {},
    colors: {
      'bg-gray': '#2a303c',
      'bg-gray-light': '#3f485a',
      'bg-gray-dark': '#242933',
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('daisyui'),
    plugin(function ({ addBase, theme, addVariant }) {
      // addBase({
      //   h1: { fontSize: theme('fontSize.7xl') },
      //   h2: { fontSize: theme('fontSize.6xl') },
      //   h3: { fontSize: theme('fontSize.3xl') },
      //   h4: { fontSize: theme('fontSize.2xl') },
      //   h6: { fontSize: theme('fontSize.lg') },
      //   h5: { fontSize: theme('fontSize.base') },
      // });
      addVariant('hocus', ['&:hover', '&:focus']);
      addVariant('not-last', '&:not(:last-child)');
    }),
  ],
};
