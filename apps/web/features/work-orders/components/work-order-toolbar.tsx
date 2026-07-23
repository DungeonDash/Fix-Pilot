"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
}

export function WorkOrderToolbar({
  search,
  onSearchChange,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <Input
        placeholder="Search work orders..."
        value={search}
        onChange={(e) =>
          onSearchChange(e.target.value)
        }
        className="max-w-sm"
      />

      <Button disabled>
        <Plus className="mr-2 h-4 w-4" />
        New Work Order
      </Button>
    </div>
  );
}