import { Router } from "express";
import RecipeController from "../app/controllers/RecipeController";

/**
 * API Routes
 *
 * @note access this router with no prefix
 */
export default function api(router: Router) {
  const recipeRouter = Router();
  router.use("/recipe", recipeRouter);

  recipeRouter.get("/", RecipeController.list);
  recipeRouter.post("/", RecipeController.store);
  recipeRouter.put("/", RecipeController.delete);
  recipeRouter.delete("/:id", RecipeController.delete);
  recipeRouter.get("/:id", RecipeController.detail);
}
