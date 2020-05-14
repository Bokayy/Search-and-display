/**
 * This is used for creating app.css and app.js which are to be used in Shell
 */

import App from './App.vue';
Vue.config.productionTip = false;

if (!window.Vue) {
  window.Vue = Vue;
}

window['pkc-name'] = App;
