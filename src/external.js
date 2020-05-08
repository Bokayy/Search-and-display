/**
 * Import Vue so the build can work outside of IZZI platform
 */
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

if (!window.Vue) {
  window.Vue = Vue;
}

window['pkc-config'] = App;
