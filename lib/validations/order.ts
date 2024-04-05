import { z } from "zod";
import { productSchema } from "./product";

const OrderSchema = z.object({
      id: z.string(),
      organizationId: z.string(),
      supplierId: z.string(),
      products: z.array(productSchema)
});