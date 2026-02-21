import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Name is required"),
  desc: z.string().min(5, "Description is too short"),
  idcategory: z.string().min(1, "Category is required"),
  images: z.string().min(1, "Image is required").or(z.array(z.string())),
});

export type ProductInput = z.infer<typeof productSchema>;
