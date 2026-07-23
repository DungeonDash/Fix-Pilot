"use client";

import { useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { Asset } from "../types";
import { AssetForm } from "../forms/asset-form";
import { useUpdateAsset } from "../mutations/use-update-asset";

interface EditAssetDialogProps {
  asset: Asset;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditAssetDialog({
  asset,
  open,
  onOpenChange,
}: EditAssetDialogProps) {
  const updateAsset = useUpdateAsset();

  useEffect(() => {
    if (updateAsset.isSuccess) {
      onOpenChange(false);
      updateAsset.reset();
    }
  }, [updateAsset, onOpenChange]);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Edit Asset
          </DialogTitle>

          <DialogDescription>
            Update asset information.
          </DialogDescription>
        </DialogHeader>

        <AssetForm
          defaultValues={{
            customerId:
              typeof asset.customerId === "string"
                ? asset.customerId
                : (asset.customerId as { id?: string; _id?: string })?.id ??
                  (asset.customerId as { id?: string; _id?: string })?._id ??
                  "",
            name: asset.name,
            assetCode: asset.assetCode,
            serialNumber: asset.serialNumber,
            manufacturer: asset.manufacturer,
            model: asset.model,
            category: asset.category,
            purchaseDate: asset.purchaseDate,
            installationDate: asset.installationDate,
            warrantyExpiry: asset.warrantyExpiry,
            location: asset.location,
            status: asset.status,
            notes: asset.notes,
            qrCode: asset.qrCode,
            barcode: asset.barcode,
          }}
          submitLabel="Save Changes"
          isSubmitting={updateAsset.isPending}
          onSubmit={async (values) => {
            const assetId = asset.id ?? (asset as { _id?: string })._id;

            if (!assetId) {
              throw new Error("Asset ID is required");
            }

            await updateAsset.mutateAsync({
              id: assetId,
              values,
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}