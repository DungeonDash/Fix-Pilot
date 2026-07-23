"use client";

import { useMemo, useState } from "react";

import { DataTable } from "@/components/common/data-table/data-table";
import { DataTablePagination } from "@/components/common/data-table/data-table-pagination";

import { useWorkOrders } from "../hooks/use-work-orders";
import { workOrderColumns } from "./work-order-columns";
import { WorkOrderToolbar } from "./work-order-toolbar";

export function WorkOrderTable() {
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const filters = useMemo(
    () => ({
      page,
      limit: 10,
      search: search || undefined,
    }),
    [page, search]
  );

  const { data, isLoading } =
    useWorkOrders(filters);

  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="space-y-4">
      <WorkOrderToolbar
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      <DataTable
        columns={workOrderColumns}
        data={data?.workOrders ?? []}
        isLoading={isLoading}
      />

      <DataTablePagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}