"use client";

import { ColumnDef } from "@tanstack/react-table";

import type { WorkOrder } from "../types";
import { WorkOrderRowActions } from "./work-order-row-actions";

export const workOrderColumns: ColumnDef<WorkOrder>[] = [
  {
    accessorKey: "workOrderNumber",
    header: "Work Order",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    id: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const customer = row.original.customerId;

      return typeof customer === "string"
        ? customer
        : customer.name;
    },
  },
  {
    id: "asset",
    header: "Asset",
    cell: ({ row }) => {
      const asset = row.original.assetId;

      return typeof asset === "string"
        ? asset
        : asset.name;
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "scheduledStart",
    header: "Scheduled",
    cell: ({ row }) =>
      row.original.scheduledStart
        ? new Date(
            row.original.scheduledStart
          ).toLocaleDateString()
        : "-",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <WorkOrderRowActions
        workOrder={row.original}
      />
    ),
  },
];