"use client";

import { DataTable } from "@/components/common/data-table/data-table";
import { customerColumns } from "./customer-columns";
import { useCustomers } from "../hooks/use-customers";
import { useState } from "react";
import type { ComponentType } from "react";
import { CustomerToolbar } from "./customer-toolbar";
import { useDebounce } from "use-debounce";
import { DataTablePagination } from "@/components/common/data-table/data-table-pagination";
import { CreateCustomerDialog } from "../dialogs/create-customer-dialog";

const CustomerToolbarComponent = CustomerToolbar as unknown as ComponentType<{
    search: string;
    onSearchChange: (value: string) => void;
    onCreate: () => void;
}>;

export function CustomerTable() {

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [debouncedSearch] = useDebounce(search, 400);

    const { data, isPending, isFetching, error } = useCustomers({
        page,
        limit: 10,
        search: debouncedSearch,
    });

    const totalPages = Math.ceil(
        ((data as any)?.total ?? 0) /
        ((data as any)?.limit ?? 10)
    );

    {
        isFetching && (
            <div className="mb-2 text-sm text-muted-foreground">
                Updating...
            </div>
        )
    }

    if (error) {
        console.error(error);

        return (
            <pre className="p-4 text-red-500">
                {JSON.stringify(error, null, 2)}
            </pre>
        );
    }

    return (
        <>
            <CustomerToolbarComponent
                search={search}
                onSearchChange={(value) => {
                    setSearch(value);
                    setPage(1);
                }}
                onCreate={() => { setOpen(true) }}
            />

            <CreateCustomerDialog
                open={open}
                onOpenChange={setOpen}
            />

            <DataTable
                columns={customerColumns}
                data={data?.data ?? []}
            />


            <DataTablePagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </>
    );
}