import type { Metadata } from "next"
import { db } from "@/lib/db"
import { DashboardShell } from "@/components/shell"
import { DashboardHeader } from "@/components/header"
import { getCurrentFormatedDate } from "@/lib/utils"
import { ProductOrderClient } from "../_components/client"

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
            <DashboardShell>
                  <DashboardHeader
                        heading={`Order(${product?.name})`}
                        text={getCurrentFormatedDate()}
                  />
                  {product && (
                        <ProductOrderClient product={product} />
                  )}
            </DashboardShell>
      )
}