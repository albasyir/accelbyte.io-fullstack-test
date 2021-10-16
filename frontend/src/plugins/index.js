/**
 * Global plugin bootstraping
 *
 */
import "./axios";

/**
 * Vue Plugin Injector
 *
 */
export const vueInjection = {
  vuetify: require("./vuetify").default,
  router: require("./vue-router").default,
};
