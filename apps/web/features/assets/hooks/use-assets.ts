"use client";

import { useQuery } from "@tanstack/react-query";

import { useAuthApi } from "@/hooks/use-auth-api";

import { AssetService } from "../services/asset.service";
import type { AssetFilters } from "../types";

export const assetKeys = {
  all: ["assets"] as const,

  lists: () => [...assetKeys.all, "list"] as const,

  list: (filters: AssetFilters) =>
    [...assetKeys.lists(), filters] as const,

  details: () => [...assetKeys.all, "detail"] as const,

  detail: (id: string) =>
    [...assetKeys.details(), id] as const,
};

export function useAssets(
  filters: AssetFilters = {}
) {
  const { request } = useAuthApi();

  return useQuery({
    queryKey: assetKeys.list(filters),

    queryFn: async () => {
      const api = await request();

      return AssetService.getAssets(
        api,
        filters
      );
    },
  });
}