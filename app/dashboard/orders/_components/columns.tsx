"use client";

import { ColumnDef } from "@tanstack/react-table";

export type OrderColumn = {
  id: string;
  shipping: number;
  product: string;
  quantity: number;
  supplier: string;
  organization: string;
  subtotal: number;
  total: number;
  tax: number;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "id",
    header: "Order Id",
  },
  {
    accessorKey: "product",
    header: "Product",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "supplier",
    header: "Supplier",
  },
  {
    accessorKey: "organization",
    header: "Organization",
  },
  {
    accessorKey: "shipping",
    header: "Shipping",
  },
  {
    accessorKey: "subtotal",
    header: "Subtotal",
  },
  {
    accessorKey: "tax",
    header: "Tax",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
];
