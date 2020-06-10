# PK Component
Scaffold for creating components used in IZZI authoring tool

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production. Produces IZZI build, and standalone build.
```
npm run build
```

## Before you begin
* Find `pkc-name` in files and replace with your desired component name, always keep `pkc-` prefix in component name to avoid naming collisions.
* Update author field in package.json. 
* Enter project name for which this component is developed in keywords in package.json. We want to keep track of components created for IZZI, Carnet, PYP etc...

## How this works

### IZZI build (default)
After building component configuration is saved to `window['pkc-name']`, and that object is used to register global Vue component. Component registration part is found at the bottom of `vue.config.js`. It gets appended to finished webpack bundle.
Vue is not included in default build (configured in `main.js`), it is available in Shell, and included in `index.html` so we never import it.

### Standalone build
Some components are available in Shell, we might need them in our component, eg. `pkc-video-player` but we do not want them included in the final bundle. Import such components in `main.js` and register as global Vue components. Do not import them in `izzi.js`. `dist/standalone.js` will include these components and that bundle can be used outside of Shell.

### Possible dependencies
Most components will need to use `pkc-common`, it is included in package.json by default. It contains some often used components and shared component styles etc. Very rarely will you not need to use it.

Other possible dependencies include:
```
"pkc-audio-player": "git+ssh://git@github.com/profil-klett/audio-player.git"
"pkc-video-player": "git+ssh://git@github.com/profil-klett/video-player.git"
```

## Avoiding side effects. Read carefully!
* Always nest all component styles under one main selector which matches `.pkc-name` to avoid global CSS scope pollution.
* Never use ids, or generate unique ids using Vue components UID.
* Any DOM querying should always be scoped to components element (`this.$el`), never use `document.querySelector`. Alternatively assign unique ID to component using Vue components UID and then query using descendant selector.

## CSS and HTML Coding standards
* All class names should be written with [BEM](http://getbem.com/introduction/) principles in mind.
* Always use only English words for naming, also for code comments, this is an international product
* Avoid using Vue scoped styles as much as possible. We prefer our CSS to compile to separate file.

## Useful knowledge

### Template structure
Most components should have the following structure to display properly in fullscreen:
```
<int-header></int-header>
<div class="int-body>
      <div class="int-content"></div>
</div>
<int-footer></int-footer>
```

Root component element should have mandatory classes `int` and `pkc-name`. Also `common-toggles.js` mixin contains `commonElClass` computed prop which provides classes for fullscreen toggling and splash screen toggling. This is mandatory.

### Dark mode
Dark mode is enabled on platform via `dark-mode` class on `body`. Make sure to test component in such situation. Use colors defined in `_variables.scss` in `pkc-common`, namely: `$black`, `$off-black`, `$border-black`. These should be enough to make the component darker.

### Assets
Place all assets which are mandatory for component to work in `/src/assets`. Put all assets used for testing/dev purposes in `/public/static`.

Every `<img>` should use alt text defined on the image object. Images provided by authoring tool are objects in this format (showing only relevant props)
```
{
      ...
      alt: 'possible alt text set on block',
      resource: {
            alt: 'possible alt text set on asset'
      },
      ...
}
```
Example of usage in template: `<img alt="image.alt || image.resource.alt">`

#### Static assets
Assets which are mandatory for component to work but are too large to inline (like 3D models, audio files and such) should be kept in `/public/static/assets`. Build script will copy them to `/dist/static/assets` and they will be consumed by the platform upon syncing the component. Asset paths however are different in Preview and Export, for that reason we use a `config` propery `pkcAssetsPath` which should contain datastore path for the component e.g. `/datastore/components/Dinosaurs/`. `pk-components-common` repo provides a mixin `asset-path.js` which solves the path problem, include it in the component and call it in `configReady` or similar.

If you need to reference assets from paths saved in component data, you must `require(./path/to/asset)` those assets so webpack becomes aware of them and runs needed transforms. If you are referencing assets in CSS or in template with a plain string then you do not need to do this.

If you need to import CSS from `node_modules` into SCSS, prefix the path with `~` followed by package name, for example:

`@import "./node_modules/taucharts/dist/taucharts.min.css";` (this will not work)
`@import "~taucharts/dist/taucharts.min.css";` (this works)




### Localisation
Localisation is done with https://kazupon.github.io/vue-i18n/ and uses https://github.com/kazupon/vue-i18n-loader
Check out `src/translations` for examples. Currently we support Croatian, English, Bulgarian and Serbian.

__Make sure to update languages keys in package.json with translated languages so we can easily find untranslated components in Authoring tool__

### Deploying
`pre-commit` git hook will run and build the project. You can avoid this by using `git commit -n` but only do this if you've not changed src files or you've run `npm run build` yourself, otherwise latest version will not be deployed after push.

### Scoring in `<objects-slider>`
Some components can be solved and submit their score after to our analytics system. There are two ways this can happen, component can be standalone or be a child of `<objects-slider>`. In both cases `scorer.js` mixin from commons repo provides `submitScore` method which handles everything. It should be called when component is solved (finished playing the game, whatever the component logic is) and should submit component title, score (percentage number) and type (component name).
`scorer.js` also contains common data props for this use, check it out. 

Below is the ususal example of `<int-footer>` which contains all controls for validating components. If component is to be scored it must match these method names exactly and contain these event listeners, data props are provided by `scorer.js`

```
<int-footer 
      :is-solved="isSolved"
      :is-submitted="isSubmitted"
      :submitted-count="submittedCount"
      :explanation="conf.explanation"
      :is-test="$parent.hasOwnProperty('isScoredParent') && $parent.config.sliderType == 'test'"
      @submit-answer="submitAnswer"
      @reset-question="reset"
      @show-solution="solve"
      >
</int-footer>
```

Check out `<true-false>` component as the simplest example of a component which is scored.


## Common issues

### KaTeX
If using `{{foobar}}` instead of `v-text` or `v-html` [KaTeX](https://katex.org/) will probably cause this part of the template to never update. Some publications use KaTex for latex rendering. To avoid these issues put `js-katex-ignore` class on the element in question or use `v-text` or `v-html`. `js-katex-ignore` is on component root element by default, but remove it if component is expected to receive config from Authoring which could contain latex.