"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { Customer } from "../types";

import { CustomerRowActions } from "./customer-row-actions";

export const customerColumns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: "Customer",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "state",
    header: "State",
  },

  {
    id: "actions",

    header: "",

    enableSorting: false,

    enableHiding: false,

    cell: ({ row }) => (
      <CustomerRowActions
        customer={row.original}
      />
    ),
  }
];