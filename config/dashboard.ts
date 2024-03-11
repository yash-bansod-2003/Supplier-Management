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
      title: "Orders",
      href: "/dashboard/orders",
      icon: "receipt",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
};
