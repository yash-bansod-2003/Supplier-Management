import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { ProductItem } from "../_components/product-item";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Page() {

  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login")
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
      <div className="grid grid-cols-4 gap-8">
        {products &&
          products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
      </div>
    </DashboardShell>
  );
}
