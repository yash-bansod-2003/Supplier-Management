import { db } from "@/lib/db";
import { DashboardShell } from "@/components/shell";
import { getCurrentUser } from "@/lib/session";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { WarehouseForm } from "../_components/form";

interface WarehousePageProps {
  params: { warehouseId: string };
}

const WarehousePage: React.FC<WarehousePageProps> = async ({ params }) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const warehouse = await db.warehouse.findUnique({
    where: {
      id: params.warehouseId,
    },
  });

  return (
    <DashboardShell>
      <WarehouseForm warehouse={warehouse} />
    </DashboardShell>
  );
};

export default WarehousePage;
