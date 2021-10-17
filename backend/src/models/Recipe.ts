import mongoose from "../plugins/mongoose";

export interface RecipeAttributes {
  name: String;
  description: String;
  type: String;
  photos: Array<{
    fieldname: String;
    originalname: String;
    encoding: String;
    mimetype: String;
    destination: String;
    filename: String;
    path: String;
    size: Number;
  }>;
  steps: Array<String>;
  ingredients: Array<{
    name: String;
    qty: String;
  }>;
}

const RecipeSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: String,
  photos: Array,
  steps: Array,
  ingredients: Array,
});

const Recipe = mongoose.model<RecipeAttributes & mongoose.Document>(
  "recipes",
  RecipeSchema
);

export default Recipe;
