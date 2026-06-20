import { z } from "zod";

export const addToCartSchema = z.object({
  productId: z.string(),

  color: z.string(),

  size: z.enum([
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
  ]),

  quantity: z.number().min(1),
});