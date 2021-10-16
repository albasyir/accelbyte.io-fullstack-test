import Vue from "vue";
import Router from "./routers";

import Template from "./templates/Default.vue";

const app = new Vue({
  router: Router(),
  render: (elementCreator) => elementCreator(Template),
});

app.$mount("#app");
