import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { OrderClient } from "./_components/client";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

const OrderPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const orders = await db.order.findMany({
    include: {
      product: true,
      organization: true,
      supplier: true,
    },
  });

  return (
    <DashboardShell>
      <DashboardHeader
        heading={`Orders(${orders.length})`}
        text="Take overview of your all orders"
      />
      <OrderClient orders={orders} currentUser={{ role: user.role }} />
    </DashboardShell>
  );
};

export default OrderPage;
