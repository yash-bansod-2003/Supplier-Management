import Link from "next/link";
import { Inventory } from "@prisma/client";

import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { InventoryOperations } from "@/app/dashboard/inventories/_components/inventory-oprations";

interface InventoryProps {
  inventory: Pick<Inventory, "id" | "location" | "quantity" | "createdAt">;
}

export function InventoryItem({ inventory }: InventoryProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-md">
      <div className="grid gap-1">
        <Link
          href={`/dashboard/inventories/${inventory.id}`}
          className="font-semibold hover:underline"
        >
          {inventory.location}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(inventory.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <InventoryOperations
        inventory={{ id: inventory.id, location: inventory.location }}
      />
    </div>
  );
}

InventoryItem.Skeleton = function InventoryItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};
