import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default function router() {
  return new Router({
    mode: "history",
    routes: [
      {
        path: "/",
        component: () => import("../pages/List.vue"),
      },
      {
        path: "/:id",
        component: () => import("../pages/List.vue"),
      },
      {
        path: "/form",
        component: () => import("../pages/List.vue"),
      },
    ],
  });
}
