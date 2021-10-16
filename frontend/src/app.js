import Vue from "vue";
import { vueInjection } from "./plugins";

import Template from "./templates/Default.vue";

const app = new Vue({
  ...vueInjection,
  render: (elementCreator) => elementCreator(Template),
});

app.$mount("#app");
