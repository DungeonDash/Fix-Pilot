import { AssetTable } from "@/features/assets/components/asset-table";

export default function AssetsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Assets
        </h1>

        <p className="text-muted-foreground">
          Manage customer assets.
        </p>
      </div>

      <AssetTable />
    </div>
  );
}