export interface Customer {
  _id: string;

  organizationId: string;

  name: string;

  email?: string;

  phone?: string;

  address?: string;

  city?: string;

  state?: string;

  country?: string;

  postalCode?: string;

  notes?: string;

  createdBy: string;

  isDeleted: boolean;

  createdAt: string;

  updatedAt: string;
}

export interface CustomerPagination {
  page: number;

  limit: number;

  total: number;
}

export interface CustomerListResponse {
  success: boolean;

  data: Customer[];

  pagination: CustomerPagination;
}

export interface CustomerResponse {
  success: boolean;

  data: Customer;
}

export interface CreateCustomerDto {
  name: string;

  email?: string;

  phone?: string;

  address?: string;

  city?: string;

  state?: string;

  country?: string;

  postalCode?: string;

  notes?: string;
}

export interface UpdateCustomerDto
  extends Partial<CreateCustomerDto> {}

export interface CustomerFilters {
  page?: number;

  limit?: number;

  search?: string;
}