"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CustomerForm } from "../forms/customer-form";

import { useCreateCustomer } from "../mutations/use-create-customer";

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;
}

export function CreateCustomerDialog({
  open,
  onOpenChange,
}: Props) {
  const mutation =
    useCreateCustomer();

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            Create Customer
          </DialogTitle>
        </DialogHeader>

        <CustomerForm
          submitLabel="Create Customer"
          isSubmitting={
            mutation.isPending
          }
          onSubmit={async (values) => {
            await mutation.mutateAsync(
              values
            );

            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}