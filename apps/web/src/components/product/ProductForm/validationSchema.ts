import { object, string, number } from "yup";

export const validationSchema = object({
  name: string().required("Product name required."),
  description: string().required("Product description required."),
  category: string().required("Category required."),
  listPrice: number().min(0).max(9999999999),
});
