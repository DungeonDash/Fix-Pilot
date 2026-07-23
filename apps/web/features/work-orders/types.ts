import type { Customer } from "@/features/customers/types";
import type { Asset } from "@/features/assets/types";

export type WorkOrderPriority =
  | "low"
  | "medium"
  | "high"
  | "urgent";

export type WorkOrderStatus =
  | "open"
  | "assigned"
  | "in_progress"
  | "on_hold"
  | "completed"
  | "cancelled";

export interface WorkOrder {
  _id: string;

  workOrderNumber: string;

  customerId: Customer | string;

  assetId: Asset | string;

  title: string;

  description?: string;

  priority: WorkOrderPriority;

  status: WorkOrderStatus;

  assignedTechnicianId?: string | null;

  scheduledStart?: string;

  scheduledEnd?: string;

  startedAt?: string;

  completedAt?: string;

  estimatedHours?: number;

  actualHours?: number;

  notes?: string;

  resolution?: string;

  createdBy: string;

  updatedBy?: string;

  createdAt: string;

  updatedAt: string;
}

export interface WorkOrderListResponse {
  success: boolean;

  workOrders: WorkOrder[];

  total: number;

  page: number;

  limit: number;

  totalPages: number;
}

export interface WorkOrderResponse {
  success: boolean;

  data: WorkOrder;
}

export interface WorkOrderFilters {
  page?: number;

  limit?: number;

  search?: string;

  customerId?: string;

  assetId?: string;

  priority?: WorkOrderPriority;

  status?: WorkOrderStatus;
}

export interface CreateWorkOrderDto {
  customerId: string;

  assetId: string;

  title: string;

  description?: string;

  priority?: WorkOrderPriority;

  assignedTechnicianId?: string;

  scheduledStart?: string;

  scheduledEnd?: string;

  estimatedHours?: number;

  notes?: string;
}

export type UpdateWorkOrderDto =
  Partial<CreateWorkOrderDto>;