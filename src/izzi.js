/**
 * Not importing Vue, it is already available on IZZI platform
 */
// if (!process.env.VUE_APP_TARGET == 'izzi') {
// }

import App from './App.vue';

Vue.config.productionTip = false;

if (!window.Vue) {
  window.Vue = Vue;
}

window['pkc-config'] = App;
