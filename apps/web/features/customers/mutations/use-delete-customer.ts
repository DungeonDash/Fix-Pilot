"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAuthApi } from "@/hooks/use-auth-api";

import { customerKeys } from "../keys";
import { CustomerService } from "../services/customer.service";

export function useDeleteCustomer() {
  const { request } = useAuthApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const api = await request();

      return CustomerService.deleteCustomer(api, id);
    },

    onSuccess: () => {
      toast.success("Customer deleted successfully");

      queryClient.invalidateQueries({
        queryKey: customerKeys.all,
      });
    },

    onError: (error: unknown) => {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to delete customer";

      toast.error(message);
    },
  });
}