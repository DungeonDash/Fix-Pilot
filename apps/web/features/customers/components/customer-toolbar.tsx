"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CustomerToolbarProps {
    search: string;
    onSearchChange: (value: string) => void;
    onCreate: () => void;
}

export function CustomerToolbar({
    search,
    onSearchChange,
    onCreate,
}: CustomerToolbarProps) {
    return (
        <div className="flex items-center justify-between gap-4 py-4">
            <Input
                placeholder="Search customers..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="max-w-sm"
            />

            <Button
                onClick={() => {
                    console.log("Add Customer clicked");
                    onCreate();
                }}
            >
                <Plus className="mr-2 h-4 w-4" />
                Add Customer
            </Button>
        </div>
    );
}