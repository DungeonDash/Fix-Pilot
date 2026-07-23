"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAuthApi } from "@/hooks/use-auth-api";

import { assetKeys } from "../hooks/use-assets";
import { AssetService } from "../services/asset.service";
import type { AssetFormValues } from "../schemas/asset.schema";

export function useUpdateAsset() {
  const { request } = useAuthApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      values,
    }: {
      id: string;
      values: AssetFormValues;
    }) => {
      const api = await request();

      return AssetService.updateAsset(
        api,
        id,
        values
      );
    },

    onSuccess: () => {
      toast.success("Asset updated successfully");

      queryClient.invalidateQueries({
        queryKey: assetKeys.all,
      });
    },

    onError: (error: unknown) => {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to update asset";

      toast.error(message);
    },
  });
}