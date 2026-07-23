"use client";

import { useQuery } from "@tanstack/react-query";

import { useAuthApi } from "@/hooks/use-auth-api";
import { CustomerService } from "../services/customer.service";

export function useCustomerOptions() {
  const { request } = useAuthApi();

  return useQuery({
    queryKey: ["customer-options"],

    queryFn: async () => {
      const api = await request();

      const response = await CustomerService.getCustomers(api, {
        page: 1,
        limit: 1000,
      });

      return Array.isArray(response.data)
        ? response.data
        : response.data?.data ?? [];
    },
  });
}