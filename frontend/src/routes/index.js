export default function router() {
  return [
    {
      name: "recipe-list",
      path: "/",
      component: () => import("@/pages/List.vue"),
    },
    {
      name: "recipe-detail",
      path: "/detail/:id",
      component: () => import("@/pages/Detail.vue"),
    },
    {
      name: "recipe-create",
      path: "/create",
      component: () => import("@/pages/Create.vue"),
    },
    {
      name: "recipe-edit",
      path: "/edit/:id",
      component: () => import("@/pages/Edit.vue"),
    },
  ];
}
