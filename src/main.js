/**
 * This is used for developing locally or building a standalone build
 */
import App from './App.vue';
Vue.config.productionTip = false;

/**
 * Import any Shell components you might need here, eg.
 */

// import VideoPlayer from '../node_modules/pkc-video-player/src/App.vue';
// Vue.component('video-player', VideoPlayer);

if (!window.Vue) {
  window.Vue = Vue;
}

window['pkc-search-and-display'] = App;
