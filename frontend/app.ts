import Vue from "vue";
import Router from "./routers";

export default function createApp(context: any) {
  const router = Router();

  return {
    app: new Vue({
      router,
      data: context,
      render: (h) => h(Template),
    }),
    router,
  };
}
