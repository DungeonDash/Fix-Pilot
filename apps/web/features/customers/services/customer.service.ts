import type { AxiosInstance } from "axios";

import type {
  CustomerFilters,
  CustomerListResponse,
  CustomerResponse,
  CreateCustomerDto,
  UpdateCustomerDto,
} from "../types";

export class CustomerService {
  static async getCustomers(
    api: AxiosInstance,
    filters: CustomerFilters = {}
  ) {
    const response = await api.get<CustomerListResponse>(
      "/customers",
      {
        params: {
          page: filters.page ?? 1,
          limit: filters.limit ?? 10,
          search: filters.search,
        },
      }
    );

    return response.data;
  }

  static async createCustomer(
    api: AxiosInstance,
    customer: CreateCustomerDto
  ) {
    const response =
      await api.post<CustomerResponse>(
        "/customers",
        customer
      );

    return response.data;
  }

  static async updateCustomer(
    api: AxiosInstance,
    id: string,
    customer: UpdateCustomerDto
  ) {
    const response =
      await api.patch<CustomerResponse>(
        `/customers/${id}`,
        customer
      );

    return response.data;
  }

  static async deleteCustomer(
    api: AxiosInstance,
    id: string
  ) {
    await api.delete(`/customers/${id}`);
  }
}