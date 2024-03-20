import { db } from "@/lib/db";
import { DashboardShell } from "@/components/shell";
import { getCurrentUser } from "@/lib/session";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { InventoryForm } from "../_components/form";

interface InventoryPageProps {
  params: { inventoryId: string };
}

const InventoryPage: React.FC<InventoryPageProps> = async ({ params }) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const inventory = await db.inventory.findUnique({
    where: {
      id: params.inventoryId,
    },
  });

  const warehouses = await db.warehouse.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <DashboardShell>
      <InventoryForm inventory={inventory} warehouses={warehouses} />
    </DashboardShell>
  );
};

export default InventoryPage;
