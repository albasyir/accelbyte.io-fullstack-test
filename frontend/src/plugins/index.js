import Vue from "vue";
import axios from "./axios";

/**
 * Vue instance plgins
 *
 */
Vue.prototype.$http = axios;

/**
 * Vue Plugin Injector
 *
 */
export const vueInjection = {
  vuetify: require("./vuetify").default,
  router: require("./vue-router").default,
  store: require("./vuex").default,
};
