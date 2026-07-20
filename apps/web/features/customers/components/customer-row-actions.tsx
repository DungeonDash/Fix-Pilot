"use client";

import { useState } from "react";

import {
    MoreHorizontal,
    Pencil,
    Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Customer } from "../types";

import { EditCustomerDialog } from "../dialogs/edit-customer-dialog";
import { DeleteCustomerDialog } from "../dialogs/delete-customer-dialog";

interface CustomerRowActionsProps {
    customer: Customer;
}

export function CustomerRowActions({
    customer,
}: CustomerRowActionsProps) {
    const [editOpen, setEditOpen] = useState(false);

    const [deleteOpen, setDeleteOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button
                        variant="ghost"
                        className="h-8 w-8 p-0"
                    >
                        <span className="sr-only">
                            Open menu
                        </span>

                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    className="w-44"
                >
                    <DropdownMenuItem
                        onClick={() =>
                            setEditOpen(true)
                        }
                    >
                        <Pencil className="mr-2 h-4 w-4" />

                        Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() =>
                            setDeleteOpen(true)
                        }
                    >
                        <Trash2 className="mr-2 h-4 w-4" />

                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <EditCustomerDialog
                customer={customer}
                open={editOpen}
                onOpenChange={setEditOpen}
            />

            <DeleteCustomerDialog
                customer={customer}
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
            />
        </>
    );
}