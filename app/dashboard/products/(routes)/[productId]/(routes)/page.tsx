import { db } from "@/lib/db";
import { DashboardShell } from "@/components/shell";
import { getCurrentUser } from "@/lib/session";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ProductForm } from "../_components/form";

interface ProductPageProps {
  params: { productId: string };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const product = await db.product.findUnique({
    where: {
      id: params.productId,
    },
  });

  const inventories = await db.inventory.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <DashboardShell>
      <ProductForm product={product} inventories={inventories} />
    </DashboardShell>
  );
};

export default ProductPage;
