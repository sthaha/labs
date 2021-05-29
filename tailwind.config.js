const purge = {
  content: ['./public/**/*.html', './src/**/*.svelte'],
  enabled: true, // process.env.ROLLUP_WATCH,
  mode: 'all',
  options: {
    whitelistPatterns: [/svelte-/],
    defaultExtractor: (txt) => [
      ...txt.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)
    ].map(([_match, group, ..._rest]) => group),
  },
}

module.exports = {
  mode: 'jit',
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
    extend: {
      height: theme => ({
        "screen-0.75": "75vh",
        "screen-0.80": "80vh",
        "screen-0.95": "95vh",
        "screen/2": "50vh",
        "screen/3": "calc(100vh / 3)",
        "screen/4": "calc(100vh / 4)",
        "screen/5": "calc(100vh / 5)",
      }),
    },
  },
  variants: {
    extend: {
      display: ["responsive", "hover", "focus"],
    },
  },
  plugins: [],
};
