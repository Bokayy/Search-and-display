# PK Component
Scaffold for creating components used in IZZI authoring tool

## Project setup
```
npm install
```

## Before you begin
Find `pkc-name` in files and replace with your desired component name.

Find `pkc-config` in files and replace with your desired component name prefixed with `pkc-`. We do this to avoid naming collisions because config for each component is saved to global window object in `main.js`.

Example component name: `drago`
Example config name: `pkc-drago`

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```


## CSS and HTML Coding standards
All class names should be written with [BEM](http://getbem.com/introduction/) principles in mind.

Basic examples of usage:

### Block
`.site-header`

### Element
`.site-header__nav`

### Modifier
`.site-header--scrolled`

* `-` is used as a generic separator in block, element and modifier names
* `__` is used to separate ONLY element from block name
* `--` is used to separate ONLY modifier from base class
* Use of ids as styling and interaction hooks is strictly forbidden!
* Avoid compounding classes, e.g. this is BAD `.site-header.site-header--scrolled`, just use `.site-header--scrolled`.
* Nest all component styles under a single selector which matches component name. This isolates components CSS from the rest of the system.
* Do not abuse nesting selectors just because SCSS allows it. It increases selector specificity and defeats the purpose of using BEM.
* Avoid element selectors!
* Every selector should be written on its own line
* Always leave a space after selector declaration and `{` e.g. this is BAD `.foo{`,  this is GOOD `.foo {`
* Always use only English words for naming, also for code comments, this is an international product
* Avoid using Vue scoped styles as much as possible. We prefer our CSS to compile to separate file.

### Avoiding side effects
* All component styles should be nested under one main selector, usually `.pkc-name` (component name) to avoid affecting anything else on the Platform.
* Any DOM querying should always be scoped to components element (`this.$el`), never use `document.querySelector`. Alternatively assign unique ID to component using Vue components UID and then query using descendant selector.

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
Dark mode is enabled on platform via `dark-mode` class on `body`. Make sure to test component in such situation. Use colors defined in `_variables.scss` in commons repo, namely: `$black`, `$off-black`, `$border-black`. These should be enough to make the component darker.

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
Use `<i18n>` inside App.vue if you need to add translations.

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
If using `{{foobar}}` instead of `v-text` or `v-html` [KaTeX](https://katex.org/) will probably cause this part of the template to never update. Some publications use KaTex for latex rendering. To avoid these issues put `js-katex-ignore` class on the element in question or use `v-text` or `v-html`.