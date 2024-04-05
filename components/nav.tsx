"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarNavItem } from "@/types";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { User } from "@prisma/client";

interface DashboardNavProps {
  items: SidebarNavItem[];
  user: Pick<User, "role">;
}

export function DashboardNav({ items, user }: DashboardNavProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"];

        const shouldRenderLink =
          (item.isAdmin && user.role === "ADMIN") ||
          (item.isOrganization && user.role === "ORGANIZATION") ||
          (!item.isAdmin && !item.isOrganization);

        return (
          item.href &&
          shouldRenderLink && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-primary",
                  path === item.href ? "bg-muted text-primary" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80",
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}
