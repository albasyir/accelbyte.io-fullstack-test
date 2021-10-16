import { Request, Response } from "express"
import Recipe from "../../models/Recipe";

export default class RecipeController {
  static async list(req: Request, res: Response) {
    Recipe.find({}).then((recipes) => {
      res.json(recipes).status(recipes.length > 0 ? 200 : 404);
    });
  }

  static store(req: Request, res: Response) {
    console.log(req.body);
    return res.json([]);
  }

  static delete(req: Request, res: Response) {

  }

  static detail(req: Request, res: Response) {
    return res.end(req.params.id);
  }
}