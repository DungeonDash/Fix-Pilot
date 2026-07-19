"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthApi } from "@/hooks/use-auth-api";
import { customerKeys } from "../keys";
import { CustomerService } from "../services/customer.service";

interface UseCustomersProps {
  page: number;
  limit: number;
  search: string;
}

export function useCustomers({
  page,
  limit,
  search,
}: UseCustomersProps) {
  const { request } = useAuthApi();

  return useQuery({
    queryKey: customerKeys.list({
      page,
      limit,
      search,
    }),

    queryFn: async () => {
      const api = await request();

      return CustomerService.getCustomers(api, {
        page,
        limit,
        search,
      });
    },

    placeholderData: (previousData) => previousData,
  });
}