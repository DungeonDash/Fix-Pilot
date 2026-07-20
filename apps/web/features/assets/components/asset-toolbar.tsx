"use client";

import { Search, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AssetToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onCreate: () => void;
}

export function AssetToolbar({
  search,
  onSearchChange,
  onCreate,
}: AssetToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          placeholder="Search assets..."
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          className="pl-9"
        />
      </div>

      <Button onClick={onCreate}>
        <Plus className="mr-2 h-4 w-4" />
        Add Asset
      </Button>
    </div>
  );
}