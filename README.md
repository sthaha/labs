# 🧪 Labs using Svelte and P5.js

> ✨ Bootstrapped with Create Snowpack App (CSA).

### What works
- [x] Integrate `p5.js` with `svelte` to create a [Canvas] component that
      responds to resizing
- [x] Configure 3D / WebGL
- [x] Use tailwind for styling and responsive layout
- [x] [Publish as a GH page][gh-pages]


### Todo
- [ ] test typings
- [ ] configure rollup bundle

  > **For the best production performance:** Add a build bundler plugin like
  [snowpack-plugin-rollup-bundle][plugin-rollup-bundle] to `snowpack.config.json` config file.


## Available Scripts

### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm test

Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!


---

[gh-page]: https://labs.gh.thaha.xyz/
[Canvas]: src/p5/Canvas.svelte
[plugin-rollup-bundle]: https://github.com/ParamagicDev/snowpack-plugin-rollup-bundle
