import type { AxiosInstance } from "axios";

import type {
  WorkOrderFilters,
  WorkOrderListResponse,
  WorkOrderResponse,
  CreateWorkOrderDto,
  UpdateWorkOrderDto,
} from "../types";

export class WorkOrderService {
  static async getWorkOrders(
    api: AxiosInstance,
    filters: WorkOrderFilters = {}
  ): Promise<WorkOrderListResponse> {
    const response = await api.get("/work-orders", {
      params: filters,
    });

    return response.data;
  }

  static async getWorkOrder(
    api: AxiosInstance,
    id: string
  ): Promise<WorkOrderResponse> {
    const response = await api.get(
      `/work-orders/${id}`
    );

    return response.data;
  }

  static async createWorkOrder(
    api: AxiosInstance,
    data: CreateWorkOrderDto
  ): Promise<WorkOrderResponse> {
    const response = await api.post(
      "/work-orders",
      data
    );

    return response.data;
  }

  static async updateWorkOrder(
    api: AxiosInstance,
    id: string,
    data: UpdateWorkOrderDto
  ): Promise<WorkOrderResponse> {
    const response = await api.patch(
      `/work-orders/${id}`,
      data
    );

    return response.data;
  }

  static async deleteWorkOrder(
    api: AxiosInstance,
    id: string
  ): Promise<void> {
    await api.delete(`/work-orders/${id}`);
  }
}