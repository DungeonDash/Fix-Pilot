import { WorkOrderTable } from "@/features/work-orders/components/work-order-table";

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Work Orders
        </h1>
        <p className="text-muted-foreground">
          Manage Work Orders.
        </p>
      </div>
      <WorkOrderTable />
    </div>
  );
}