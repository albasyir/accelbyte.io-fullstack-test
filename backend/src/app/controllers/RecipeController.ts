import { defaultMaxListeners } from "events";
import { Request, Response } from "express"
import Recipe from "../../models/Recipe";

export default class RecipeController {
  static async list(req: Request, res: Response) {
    Recipe.find({}).then((recipes) => {
      res.json(recipes).status(recipes.length > 0 ? 200 : 404);
    }).catch((error) => {
      res.json(error).status(400); // bad request
    })
  }

  static store(req: Request, res: Response) {
    const newRecipe = new Recipe(req.body);

    newRecipe.save().then((result) => {
      res.status(204).end();
    }).catch((error) => {
      res.json(error);

      // TODO
      res.status(422); // when unprosses entity
      res.status(400); // bad request
    });
  }

  static update(req: Request, res: Response) {

    Recipe.findOneAndUpdate({ '_id': req.params.id }, req.body).then(result => {
      res.status(204).end();
    }).catch((error) => {
      res.json(error);

      // TODO
      res.status(422); // when unprosses entity
      res.status(400); // bad request
    })
  }

  static delete(req: Request, res: Response) {
    Recipe.deleteOne().then((result) => {
      res.status(204).end();
    }).catch((error) => {
      res.json(error).status(400)
    })
  }

  static detail(req: Request, res: Response) {
    Recipe.findOne({ '_id': req.params.id }).then(detail => {
      res.json(detail).status(200);
    }).catch((error) => {
      res.json(error).status(404); // not found
    })
  }
}