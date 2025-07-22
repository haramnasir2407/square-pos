import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      semanticTokens: {
        colors: {
          bg: {
            default: { value: '{colors.white}' },
            muted: { value: '{colors.gray.50}' },
          },
          text: {
            primary: { value: '{colors.gray.900}' },
            secondary: { value: '{colors.gray.600}' },
          },
          border: {
            default: { value: '{colors.gray.200}' },
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
})
