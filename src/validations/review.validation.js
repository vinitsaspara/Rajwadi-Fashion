import { z } from "zod";

export const createReviewSchema = z.object({
  productId: z.string(),

  rating: z.number().min(1).max(5),

  comment: z.string().min(3),
});

export const updateReviewSchema = z.object({
  rating: z.number().min(1).max(5),

  comment: z.string().min(3),
});