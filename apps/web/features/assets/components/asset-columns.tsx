"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

import type {
  Asset,
  AssetCustomer,
} from "../types";

import { AssetRowActions } from "./asset-row-actions";

function getCustomerName(
  customer: string | AssetCustomer
) {
  if (typeof customer === "string") {
    return "-";
  }

  return customer.name;
}

export const assetColumns: ColumnDef<Asset>[] = [
  {
    accessorKey: "name",

    header: "Asset",
  },

  {
    accessorKey: "assetCode",

    header: "Asset Code",
  },

  {
    id: "customer",

    header: "Customer",

    cell: ({ row }) =>
      getCustomerName(row.original.customerId),
  },

  {
    accessorKey: "category",

    header: "Category",

    cell: ({ row }) =>
      row.original.category || "-",
  },

  {
    accessorKey: "location",

    header: "Location",

    cell: ({ row }) =>
      row.original.location || "-",
  },

  {
    accessorKey: "status",

    header: "Status",

    cell: ({ row }) => (
      <Badge variant="secondary">
        {row.original.status}
      </Badge>
    ),
  },

  {
    id: "actions",

    enableSorting: false,

    enableHiding: false,

    cell: ({ row }) => (
      <AssetRowActions
        asset={row.original}
      />
    ),
  },
];