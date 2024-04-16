import { z } from "zod";

export const orderSchema = z.object({
  shipping: z.number(),
  subtotal: z.number(),
  total: z.number(),
  tax: z.number(),
  productId: z.string(),
  quantity: z.number(),
});
