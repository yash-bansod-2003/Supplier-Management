import * as z from "zod";
import { $Enums } from "@prisma/client";

export const productSchema = z.object({
  name: z.string().min(3).max(32),
  description: z.string().min(3).max(120).optional(),
  color: z
    .string()
    .refine((value) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value), {
      message: "Invalid hex color code format",
    }),
  weight: z.string().min(1).max(32).optional(),
  unit: z.nativeEnum($Enums.Units),
  cost: z.string().min(1).max(20)
});
