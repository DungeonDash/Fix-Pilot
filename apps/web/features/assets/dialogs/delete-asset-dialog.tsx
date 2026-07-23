"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import type { Asset } from "../types";
import { useDeleteAsset } from "../mutations/use-delete-asset";

interface DeleteAssetDialogProps {
  asset: Asset;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteAssetDialog({
  asset,
  open,
  onOpenChange,
}: DeleteAssetDialogProps) {
  const deleteAsset = useDeleteAsset();

  async function handleDelete() {
    const assetId = asset.id ?? (asset as { _id?: string })._id;

    if (!assetId) {
      throw new Error("Asset ID is required");
    }

    await deleteAsset.mutateAsync(assetId);

    onOpenChange(false);
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Asset
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold">
              {asset.name}
            </span>
            ?
            <br />
            <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={deleteAsset.isPending}
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={deleteAsset.isPending}
          >
            {deleteAsset.isPending
              ? "Deleting..."
              : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
