export interface AssetCustomer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

export type AssetStatus =
  | "active"
  | "inactive"
  | "maintenance"
  | "retired";

export interface Asset {
  id: string;

  customerId: string | AssetCustomer;

  name: string;

  assetCode: string;

  serialNumber?: string;

  manufacturer?: string;

  model?: string;

  category?: string;

  purchaseDate?: string;

  installationDate?: string;

  warrantyExpiry?: string;

  location?: string;

  status: AssetStatus;

  notes?: string;

  qrCode?: string;

  barcode?: string;

  createdAt: string;

  updatedAt: string;
}

export interface AssetPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AssetListResponse {
  success: boolean;
  data: Asset[];
  pagination: AssetPagination;
}

export interface AssetResponse {
  success: boolean;
  data: Asset;
}

export interface CreateAssetDto {
  customerId: string;

  name: string;

  assetCode: string;

  serialNumber?: string;

  manufacturer?: string;

  model?: string;

  category?: string;

  purchaseDate?: string;

  installationDate?: string;

  warrantyExpiry?: string;

  location?: string;

  status?: AssetStatus;

  notes?: string;

  qrCode?: string;

  barcode?: string;
}

export interface UpdateAssetDto
  extends Partial<CreateAssetDto> {}

export interface AssetFilters {
  page?: number;

  limit?: number;

  search?: string;

  customerId?: string;

  category?: string;

  status?: AssetStatus;
}