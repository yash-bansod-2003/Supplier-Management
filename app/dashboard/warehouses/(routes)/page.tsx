import { redirect } from "next/navigation";
import Link from "next/link";

import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { buttonVariants } from "@/components/ui/button";
import { WarehouseItem } from "@/app/dashboard/warehouses/_components/Warehouse-item";
import { Icons } from "@/components/icons";

export const metadata = {
  title: "Warehouses",
};

export default async function WarehousesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const warehouses = await db.warehouse.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Warehouses"
        text="Create and manage warehouses."
      >
        <Link href="/dashboard/warehouses/new" className={buttonVariants()}>
          <Icons.add className="mr-2 h-4 w-4" /> Create New
        </Link>
      </DashboardHeader>
      <div>
        {warehouses?.length ? (
          <div className="space-y-5">
            {warehouses.map((warehous) => (
              <WarehouseItem key={warehous.id} warehouse={warehous} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="warehouse" />
            <EmptyPlaceholder.Title>
              No Warehouse created
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any warehouse yet. Start creating one.
            </EmptyPlaceholder.Description>
            <Link
              href="/dashboard/warehouses/new"
              className={buttonVariants({ variant: "outline" })}
            >
              <Icons.add className="mr-2 h-4 w-4" /> Create New
            </Link>
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
