import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [],
  sidebarNav: [
    {
      title: "Overview",
      href: "/dashboard",
      icon: "overview",
    },
    {
      title: "Users",
      href: "/dashboard/users",
      icon: "group",
      isAdmin: true,
    },
    {
      title: "Suppliers",
      href: "/dashboard/suppliers",
      icon: "store",
      isOrganization: true,
      isAdmin: true,
    },
    {
      title: "Warehouse",
      href: "/dashboard/warehouses",
      icon: "warehouse",
    },
    {
      title: "Inventory",
      href: "/dashboard/inventories",
      icon: "inventory",
    },
    {
      title: "Product",
      href: "/dashboard/products",
      icon: "product",
    },
    {
      title: "Documents",
      href: "/dashboard/documents",
      icon: "document",
      isAdmin: true,
    },
    {
      title: "Orders",
      href: "/dashboard/orders",
      icon: "receipt",
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "bill",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
};
