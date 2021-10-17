import { Router, static as s } from "express";

/**
 * Asset Routes
 *
 * @note access this router with prefix /public
 */
export default function asset(router: Router) {
  router.use("/", s(process.cwd() + "/public"));
}
