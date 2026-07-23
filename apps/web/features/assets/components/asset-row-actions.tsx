"use client";

import { useState } from "react";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Asset } from "../types";
import { EditAssetDialog } from "../dialogs/edit-asset-dialog";
import { DeleteAssetDialog } from "../dialogs/delete-asset-dialog";

interface AssetRowActionsProps {
  asset: Asset;
}

export function AssetRowActions({
  asset,
}: AssetRowActionsProps) {
  const [editOpen, setEditOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            variant="ghost"
            size="icon"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">

          <DropdownMenuItem
            onClick={() =>
              setEditOpen(true)
            }
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-destructive"
            onClick={() =>
              setDeleteOpen(true)
            }
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>

      <EditAssetDialog
        asset={asset}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <DeleteAssetDialog
        asset={asset}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}