import { Router } from "express";

export default function web(router: Router) {
  router.get("/", (req, res) => res.end("hai"));
}
