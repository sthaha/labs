const purge = {
  content: ['./src/**/*.svelte', './public/*.html'],
  enabled: !process.env.ROLLUP_WATCH,
  mode: 'all',
  options: {
    whitelistPatterns: [/svelte-/],
    defaultExtractor: (txt) => [
      ...txt.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)
    ].map(([_match, group, ..._rest]) => group),
  },
}

module.exports = {
  purge,
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  experimental: {
    uniformColorPalette: true,
    extendedFontSizeScale: true,
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
