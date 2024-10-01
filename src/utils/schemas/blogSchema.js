import { object, string } from "yup";

const blogSchema = object().shape({
  title: string()
    .min(4, "Title must be at least 4 characters")
    .max(300, "Title must be at most 300 characters")
    .required("Title is required"),
  content: string()
    .min(10, "Content must be at least 10 characters")
    .required("Content is required"),
});

export default blogSchema;

