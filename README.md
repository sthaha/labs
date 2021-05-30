# [🧪 Labs: 🏠][gh-page] for all my learning


## Credits:
  * ✨ Bootstrapped with Create Snowpack App (CSA).
  * ✨ A lot of code samples are _inspired_ by [Nature of Code][noc]
  * ✨ Recreation of [Challenges published by Daniel Shiffman][challenges]

## Project
### What works
- [x] [Publish as a GH page][gh-page]
- [x] Integrate `p5.js` with `svelte` to create a [Canvas] component that
      responds to resizing
- [x] Configure 3D / WebGL
- [x] Use tailwind for styling and responsive layout
- [x] typescript typings


### Todo
- [ ] minimize p5js
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
[noc]: https://natureofcode.com/
[challenges]: https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw
