import type { Metadata } from "next"
import { db } from "@/lib/db"
export const metadata: Metadata = {
      title: "Place Order"
}

interface ProductOrderPageProps {
      params: {
            productId: string
      }
}

export default async function ProductOrderPage({ params }: ProductOrderPageProps) {

      const product = await db.product.findFirst({
            where: {
                  id: params.productId
            }
      });

      return (
            <div>
                  {JSON.stringify(product)}
            </div>
      )
}