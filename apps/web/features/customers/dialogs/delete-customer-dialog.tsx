"use client";

import { useEffect, type MouseEvent } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";

import { useDeleteCustomer } from "../mutations/use-delete-customer";
import type { Customer } from "../types";

interface DeleteCustomerDialogProps {
  customer: Customer;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteCustomerDialog({
  customer,
  open,
  onOpenChange,
}: DeleteCustomerDialogProps) {
  const deleteCustomer = useDeleteCustomer();

  useEffect(() => {
    if (deleteCustomer.isSuccess) {
      onOpenChange(false);
      deleteCustomer.reset();
    }
  }, [deleteCustomer, onOpenChange]);

  const handleDelete = async () => {
    await deleteCustomer.mutateAsync(customer._id);
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Customer
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <strong>{customer.name}</strong>?
            <br />
            <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={deleteCustomer.isPending}
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={deleteCustomer.isPending}
            className="bg-red-600 hover:bg-red-700"
          >
            {deleteCustomer.isPending
              ? "Deleting..."
              : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}