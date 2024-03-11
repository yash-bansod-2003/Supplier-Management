import Link from "next/link";
import { Warehouse } from "@prisma/client";

import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { WarehouseOperations } from "@/app/dashboard/warehouses/_components/Warehouse-oprations";

interface WarehouseProps {
  warehouse: Pick<Warehouse, "id" | "name" | "createdAt">;
}

export function WarehouseItem({ warehouse }: WarehouseProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-md">
      <div className="grid gap-1">
        <Link
          href={`/dashboard/warehouses/${warehouse.id}`}
          className="font-semibold hover:underline"
        >
          {warehouse.name}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(warehouse.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <WarehouseOperations
        warehouse={{ id: warehouse.id, name: warehouse.name }}
      />
    </div>
  );
}

WarehouseItem.Skeleton = function WarehouseItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};
