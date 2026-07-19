"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAuthApi } from "@/hooks/use-auth-api";

import { customerKeys } from "../keys";
import { CustomerService } from "../services/customer.service";
import type { CustomerFormValues } from "../schemas/customer.schema";

export function useCreateCustomer() {
  const { request } = useAuthApi();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      values: CustomerFormValues
    ) => {
      const api = await request();

      const payload = {
        ...values,
        email: values.email || undefined,
        phone: values.phone || undefined,
        address: values.address || undefined,
        city: values.city || undefined,
        state: values.state || undefined,
        country: values.country || undefined,
        postalCode:
          values.postalCode || undefined,
        notes: values.notes || undefined,
      };

      return CustomerService.createCustomer(
        api,
        payload
      );
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: customerKeys.all,
      });

      toast.success(
        "Customer created successfully."
      );
    },

    onError() {
      toast.error(
        "Unable to create customer."
      );
    },
  });
}