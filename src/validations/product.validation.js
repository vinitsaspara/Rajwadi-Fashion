import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3),

  description: z.string().min(10),

  price: z.number(),

  discountPrice: z.number().optional(),

  categoryId: z.string(),

  isFeatured: z.boolean().optional(),

  isBestSeller: z.boolean().optional(),

  colors: z.array(
    z.object({
      colorName: z.string(),

      images: z.array(z.string()),

      sizes: z.array(
        z.object({
          size: z.enum([
            "XS",
            "S",
            "M",
            "L",
            "XL",
            "XXL",
          ]),

          stock: z.number(),
        })
      ),
    })
  ),
});