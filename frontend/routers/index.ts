import Vue from "vue"
import Router from "vue-router"

Vue.use(Router);

export default function router() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: "/",
        component: { template: `list` }
      },
      {
        path: "/:id",
        component: { template: `detail` }
      },
      {
        path: "/form",
        component: { template: `insert or update form` }
      },
    ]
  })
}