import { z } from "zod";

export const createAddressSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "A valid phone number is required"),
  addressLine: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().min(4, "A valid pincode is required"),
  isDefault: z.boolean().optional(),
});

export const updateAddressSchema = createAddressSchema.partial();
