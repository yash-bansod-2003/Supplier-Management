import Link from "next/link";
import { Inventory, User } from "@prisma/client";

import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { UserOperations } from "@/app/dashboard/users/_components/users-oprations";
import { Badge } from "@/components/ui/badge";

interface UserProps {
  user: Pick<User, "id" | "email" | "role" | "createdAt" | "name">;
}

export function UserItem({ user }: UserProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-md">
      <div className="grid gap-1">
        <Link
          href={`/users/${user.id}`}
          className="font-semibold hover:underline"
        >
          {user.name} <Badge>{user.role}</Badge>
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(user.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <UserOperations
        user={{ id: user.id, email: user.email, role: user.role }}
      />
    </div>
  );
}

UserItem.Skeleton = function UserItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};
