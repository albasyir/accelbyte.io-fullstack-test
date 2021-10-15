import { Router } from "express";

/**
 * API Routes
 *
 * @note access this router with prefix /api
 */
export default function api(router: Router) {
  router.get("/", () => "hai");
}
