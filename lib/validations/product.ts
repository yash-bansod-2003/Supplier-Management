import * as z from "zod";
import { $Enums } from "@prisma/client";

export const productSchema = z.object({
  name: z.string().min(3).max(32),
  description: z.string().min(3).max(120).optional(),
  color: z.string(),
  weight: z.string().min(1).max(32).optional(),
  unit: z.nativeEnum($Enums.Units),
  quantity: z.string(),
  category: z.string().max(100),
  inventoryId: z.string(),
  cost: z.string().min(1).max(20),
});
