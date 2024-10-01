import { object, string } from "yup";

const recipeSchema = object().shape({
  title: string()
    .min(4, "Title must be at least 4 characters")
    .max(100, "Title must be at most 100 characters")
    .required("Title is required"),
  ingredients: string()
    .min(5, "Ingredients must be at least 5 characters")
    .required("Ingredients are required"),
  instructions: string()
    .min(10, "Instructions must be at least 10 characters")
    .required("Instructions are required"),
});

export default recipeSchema;

