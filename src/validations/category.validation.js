import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name is required"),

  image: z
    .string()
    .optional(),

  description: z
    .string()
    .optional(),
});