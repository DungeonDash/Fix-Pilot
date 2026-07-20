"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";

import { DataTable } from "@/components/common/data-table/data-table";
import { DataTablePagination } from "@/components/common/data-table/data-table-pagination";

import { useAssets } from "../hooks/use-assets";
import { assetColumns } from "./asset-columns";
import { AssetToolbar } from "./asset-toolbar";
import { CreateAssetDialog } from "../dialogs/create-asset-dialog";



export function AssetTable() {
    const [search, setSearch] = useState("");

    const [open, setOpen] = useState(false);

    const [debouncedSearch] = useDebounce(search, 400);

    const [page, setPage] = useState(1);

    const [limit, setLimit] = useState(10);

    const { data, isLoading, isFetching, isError } = useAssets({
        page,
        limit,
        search: debouncedSearch,
    });

    const totalPages = data?.pagination.totalPages ?? 1;

    return (
        <>
            <AssetToolbar
                search={search}
                onSearchChange={(value) => {
                    setSearch(value);
                    setPage(1);
                }}
                onCreate={() => setOpen(true)}
            />

            {isError ? (
                <div className="p-4 text-red-500">
                    Failed to load assets.
                </div>
            ) : (
                <>
                    {isFetching && !isLoading ? (
                        <div className="mb-2 text-sm text-muted-foreground">
                            Updating...
                        </div>
                    ) : null}

                    <DataTable
                        columns={assetColumns}
                        data={data?.data ?? []}
                    />

                    <DataTablePagination
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </>
            )}

            <CreateAssetDialog
                open={open}
                onOpenChange={setOpen}
            />
        </>
    );
}