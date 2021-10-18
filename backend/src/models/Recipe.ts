import mongoose from "../plugins/mongoose";

export enum RecipeType {
  MAIN = "main course",
  DESSERT = "dessert",
  APPETIZER = "appetizer",
  DRINK = "drink",
}

export interface RecipeAttributes {
  name: String;
  description: String;
  type: RecipeType;
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
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: Object.values(RecipeType),
    required: true,
  },
  photos: {
    type: [
      {
        fieldname: String,
        originalname: String,
        encoding: String,
        mimetype: String,
        destination: String,
        filename: String,
        path: String,
        size: Number,
      },
    ],
    required: true,
  },
  steps: {
    type: [String],
    required: true,
  },
  ingredients: {
    type: [
      {
        name: String,
        qty: String,
      },
    ],
    required: true,
  },
});

const Recipe = mongoose.model<RecipeAttributes & mongoose.Document>(
  "recipes",
  RecipeSchema
);

export default Recipe;
