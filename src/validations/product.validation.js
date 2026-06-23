import { z } from "zod";

const productColorSchema = z.object({
  colorName: z.string().min(1),

  images: z.array(z.string().min(1)),

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

      stock: z.number().int().min(0),
    })
  ),
});

export const createProductSchema = z.object({
  name: z.string().min(3),

  description: z.string().min(10),

  price: z.number(),

  discountPrice: z.number().optional(),

  categoryId: z.string(),

  isFeatured: z.boolean().optional(),

  isBestSeller: z.boolean().optional(),

  colors: z.array(productColorSchema),
});

export const updateProductSchema = createProductSchema
  .partial()
  .extend({
    discountPrice: z.number().nullable().optional(),
    isActive: z.boolean().optional(),
  });
