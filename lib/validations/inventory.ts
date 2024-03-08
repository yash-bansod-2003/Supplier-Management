import * as z from "zod";

export const inventorySchema = z.object({
  quantity: z.string().min(1),
  location: z.string().min(3).max(100),
  reorderPoint: z.string().min(1),
  warehouseId: z.string().min(3),
});
