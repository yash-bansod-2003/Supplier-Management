import * as z from "zod";

export const warehouseSchema = z.object({
  name: z.string().min(3).max(32),
  location: z.string().min(3).max(100),
  capacity: z.string().min(1).max(10),
});
