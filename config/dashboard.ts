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
      title: "Warehouse",
      href: "/dashboard/warehouse",
      icon: "warehouse",
    },
    {
      title: "Inventory",
      href: "/dashboard/inventory",
      icon: "inventory",
    },
    {
      title: "Product",
      href: "/dashboard/products",
      icon: "product",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
};
