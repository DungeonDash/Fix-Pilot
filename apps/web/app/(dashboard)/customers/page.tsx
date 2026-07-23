import { CustomerTable } from "@/features/customers/components/customer-table";

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Customers
        </h1>

        <p className="text-muted-foreground">
          Manage customer information.
        </p>
      </div>
      <CustomerTable />
    </div>
  );
}