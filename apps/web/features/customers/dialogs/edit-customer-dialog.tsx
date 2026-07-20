"use client";

import { useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { CustomerForm } from "../forms/customer-form";
import { useUpdateCustomer } from "../mutations/use-update-customer";
import type { Customer } from "../types";
import type { CustomerFormValues } from "../schemas/customer.schema";

interface EditCustomerDialogProps {
  customer: Customer;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditCustomerDialog({
  customer,
  open,
  onOpenChange,
}: EditCustomerDialogProps) {
  const updateCustomer = useUpdateCustomer();

  useEffect(() => {
    if (updateCustomer.isSuccess) {
      onOpenChange(false);
      updateCustomer.reset();
    }
  }, [updateCustomer, onOpenChange]);

  const handleSubmit = async (
    values: CustomerFormValues
  ) => {
    await updateCustomer.mutateAsync({
      id: customer._id,
      values,
    });
  };

  const defaultValues: CustomerFormValues = {
    name: customer.name ?? "",
    email: customer.email ?? "",
    phone: customer.phone ?? "",
    address: customer.address ?? "",
    city: customer.city ?? "",
    state: customer.state ?? "",
    country: customer.country ?? "",
    postalCode: customer.postalCode ?? "",
    notes: customer.notes ?? "",
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Edit Customer
          </DialogTitle>

          <DialogDescription>
            Update customer information.
          </DialogDescription>
        </DialogHeader>

        <CustomerForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          isSubmitting={updateCustomer.isPending}
          submitLabel="Save Changes"
        />
      </DialogContent>
    </Dialog>
  );
}