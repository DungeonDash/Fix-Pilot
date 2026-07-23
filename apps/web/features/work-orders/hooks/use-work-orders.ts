"use client";

import { useQuery } from "@tanstack/react-query";

import { useAuthApi } from "@/hooks/use-auth-api";

import { WorkOrderService } from "../services/work-order.service";
import type { WorkOrderFilters } from "../types";

export const workOrderKeys = {
  all: ["work-orders"] as const,

  list: (filters: WorkOrderFilters) =>
    [...workOrderKeys.all, filters] as const,

  detail: (id: string) =>
    [...workOrderKeys.all, id] as const,
};

export function useWorkOrders(
  filters: WorkOrderFilters
) {
  const { request } = useAuthApi();

  return useQuery({
    queryKey: workOrderKeys.list(filters),

    queryFn: async () => {
      const api = await request();

      return WorkOrderService.getWorkOrders(
        api,
        filters
      );
    },
  });
}