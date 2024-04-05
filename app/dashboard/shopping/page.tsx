import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { ProductItem } from "./_components/product-item";
import { db } from "@/lib/db";

export default async function Page() {
  const products = await db.product.findMany();

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
