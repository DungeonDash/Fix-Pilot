"use client";

import { useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { AssetForm } from "../forms/asset-form";
import { useCreateAsset } from "../mutations/use-create-asset";

interface CreateAssetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateAssetDialog({
  open,
  onOpenChange,
}: CreateAssetDialogProps) {
  const createAsset = useCreateAsset();

  useEffect(() => {
    if (createAsset.isSuccess) {
      onOpenChange(false);
      createAsset.reset();
    }
  }, [createAsset, onOpenChange]);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Add Asset
          </DialogTitle>

          <DialogDescription>
            Register a new customer asset.
          </DialogDescription>
        </DialogHeader>

        <AssetForm
          submitLabel="Create Asset"
          isSubmitting={createAsset.isPending}
          onSubmit={async (values) => {
            await createAsset.mutateAsync(values);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}