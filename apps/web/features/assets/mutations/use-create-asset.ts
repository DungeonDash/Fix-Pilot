"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAuthApi } from "@/hooks/use-auth-api";

import { AssetService } from "../services/asset.service";
import { assetKeys } from "../hooks/use-assets";
import type { AssetFormValues } from "../schemas/asset.schema";

export function useCreateAsset() {
  const { request } = useAuthApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: AssetFormValues) => {
      const api = await request();

      return AssetService.createAsset(api, values);
    },

    onSuccess: () => {
      toast.success("Asset created successfully");

      queryClient.invalidateQueries({
        queryKey: assetKeys.all,
      });
    },

    onError: (error: unknown) => {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to create asset";

      toast.error(message);
    },
  });
}