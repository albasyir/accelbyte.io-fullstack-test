import { Request, Response } from "express";
import Recipe, { RecipeType } from "@/models/Recipe";

export default class RecipeController {
  /**
   * Get all recipes
   *
   * @param req Request
   * @param res Response
   */
  static async list(req: Request, res: Response) {
    let filter: any = {};

    // filter by keyword
    if (req.query.keyword && req.query.keyword.length) {
      filter.$or = [
        { name: { $regex: req.query.keyword, $options: "i" } },
        { description: { $regex: req.query.keyword, $options: "i" } },
      ];
    }

    // filter by category
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // get all recipes that filtered by keyword and category
    Recipe.find(filter)

      // select only field that we need
      .select(["name", "description", "category", "photos.path"])

      // success response
      .then((recipes) => {
        res.json(recipes).status(recipes.length > 0 ? 200 : 404);
      })

      // error response
      .catch((error) => {
        res.json(error).status(400); // bad request
      });
  }

  /**
   * Store a new recipe
   *
   * @param req Request
   * @param res Response
   */
  static store(req: Request, res: Response) {
    // pripare data
    const data = {
      ...req.body,
      photos: req.files,
    };

    // try to assert new recipe
    const newRecipe = new Recipe(data);

    // try to save new recipe
    newRecipe
      .save()

      // success response
      .then((result) => {
        res.status(204).end();
      })

      // error response
      .catch((error) => {
        if (error.name === "ValidationError") {
          res.status(422);
          return res.json(error); // when unprosses entity
        }

        res.status(400); // bad request
      });
  }

  /**
   * Update a recipe
   *
   * @param req Request
   * @param res Response
   */
  static update(req: Request, res: Response) {
    // pripare data
    const data = {
      ...req.body,
      photos: req.files,
    };

    Recipe.findOneAndUpdate({ _id: req.params.id }, data)
      .then((result) => {
        res.status(204).end();
      })
      .catch((error) => {
        if (error.name === "ValidationError") {
          res.status(422);
          return res.json(error);
        }

        res.status(400); // bad request
      });
  }

  /**
   * Delete a recipe
   *
   * @param req Request
   * @param res Response
   */
  static delete(req: Request, res: Response) {
    // try to delete recipe
    Recipe.deleteOne({ _id: req.params.id })

      // success response
      .then((result) => {
        res.status(204).end();
      })

      // error response
      .catch((error) => {
        res.json(error).status(400);
      });
  }

  /**
   * Get a recipe detail
   *
   * @param req Request
   * @param res Response
   */
  static detail(req: Request, res: Response) {
    // try to get recipe detail
    Recipe.findOne({ _id: req.params.id })

      // success response
      .then((detail) => {
        res.json(detail).status(200);
      })

      // error response
      .catch((error) => {
        res.json(error).status(404);
      });
  }
}
