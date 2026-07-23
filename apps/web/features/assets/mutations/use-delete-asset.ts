"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAuthApi } from "@/hooks/use-auth-api";

import { AssetService } from "../services/asset.service";
import { assetKeys } from "../hooks/use-assets";

export function useDeleteAsset() {
  const { request } = useAuthApi();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!id) {
        throw new Error("Asset ID is required");
      }

      const api = await request();

      return AssetService.deleteAsset(
        api,
        id
      );
    },

    onSuccess: () => {
      toast.success(
        "Asset deleted successfully"
      );

      queryClient.invalidateQueries({
        queryKey: assetKeys.all,
      });
    },

    onError: (error: unknown) => {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to delete asset";

      toast.error(message);
    },
  });
}