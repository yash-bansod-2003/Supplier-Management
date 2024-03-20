import { redirect } from "next/navigation";
import Link from "next/link";

import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { buttonVariants } from "@/components/ui/button";
import { InventoryItem } from "@/app/dashboard/inventories/_components/inventory-item";
import { Icons } from "@/components/icons";

export const metadata = {
  title: "Documents",
};

export default async function WarehousesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const inventories = await db.inventory.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <DashboardShell>
      <DashboardHeader heading="Documents" text="Create and manage documents.">
        <Link href="/dashboard/documents/new" className={buttonVariants()}>
          <Icons.add className="mr-2 h-4 w-4" /> Create New
        </Link>
      </DashboardHeader>
      <div>
        {inventories?.length ? (
          <div className="space-y-5">
            {inventories.map((inventory) => (
              <InventoryItem key={inventory.id} inventory={inventory} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="inventory" />
            <EmptyPlaceholder.Title>
              No inventory created
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any inventory yet. Start creating one.
            </EmptyPlaceholder.Description>
            <Link
              href="/dashboard/inventories/new"
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
