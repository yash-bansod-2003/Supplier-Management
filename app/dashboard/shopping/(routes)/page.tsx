import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { ProductItem } from "../_components/product-item";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { EmptyPlaceholder } from "@/components/empty-placeholder";

export default async function Page() {

  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login")
  }

  if (user.role !== "ORGANIZATION") {
    return redirect("/dashboard")
  }

  const products = await db.product.findMany({
    where: {
      userId: {
        not: {
          equals: user.id
        }
      },
      user: {
        role: "SUPPLIER"
      }
    }
  });

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Shopping"
        text="make shopping and place orders."
      />
      <div>
        {products?.length ? (
          <div className="grid grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="product" />
            <EmptyPlaceholder.Title>No Product To Place Order</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Suppliers don&apos;t have any product yet.
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
