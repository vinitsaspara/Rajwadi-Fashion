import { z } from "zod";

export const checkoutSchema = z.object({
  couponCode: z.string().optional(),

  shippingAddress: z.object({
    fullName: z.string(),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    pincode: z.string(),
  }),
});