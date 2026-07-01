import { z } from "zod";

const productColorSchema = z.object({
  colorName: z.string().min(1, "Color name is required"),

  sizes: z
    .array(
      z.object({
        size: z.enum([
          "XXS",
          "XS",
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "XXXL",
          "XXXXL",

          "SIZE_26",
          "SIZE_28",
          "SIZE_30",
          "SIZE_32",
          "SIZE_34",
          "SIZE_36",
          "SIZE_38",
          "SIZE_40",
          "SIZE_42",
          "SIZE_44",
          "SIZE_46",

          "UK_4",
          "UK_5",
          "UK_6",
          "UK_7",
          "UK_8",
          "UK_9",
          "UK_10",
          "UK_11",

          "Free_Size",
        ]),
        stock: z.number().int().min(0),
      })
    )
    .min(1, "At least one size is required"),
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
