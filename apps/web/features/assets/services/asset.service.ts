import type { AxiosInstance } from "axios";

import type {
  Asset,
  AssetFilters,
  AssetListResponse,
  AssetResponse,
  CreateAssetDto,
  UpdateAssetDto,
} from "../types";

function normalizeAsset(asset: Record<string, unknown>): Asset {
  const assetValue = asset as Partial<Asset> & {
    _id?: string;
    customerId?: string | Record<string, unknown>;
  };

  const customerId = assetValue.customerId;
  const normalizedCustomerId =
    typeof customerId === "string"
      ? customerId
      : customerId && typeof customerId === "object"
        ? {
            ...(customerId as Record<string, unknown>),
            id:
              (customerId as { id?: string; _id?: string }).id ??
              (customerId as { id?: string; _id?: string })._id,
          }
        : customerId;

  return {
    ...(assetValue as Asset),
    id: assetValue.id ?? assetValue._id ?? "",
    customerId: normalizedCustomerId as Asset["customerId"],
  };
}

function sanitizePayload<T extends object>(data: T): T {
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => {
      if (value === "") return false;
      if (value === undefined) return false;

      return true;
    })
  ) as T;
}

export class AssetService {
  static async getAssets(
    api: AxiosInstance,
    filters: AssetFilters = {}
  ): Promise<AssetListResponse> {
    const response = await api.get("/assets", {
      params: filters,
    });

    return {
      ...response.data,
      data: response.data.data.map(
        (asset: Record<string, unknown>) =>
          normalizeAsset(asset)
      ),
    };
  }

  static async getAsset(
    api: AxiosInstance,
    id: string
  ): Promise<AssetResponse> {
    const response = await api.get(
      `/assets/${id}`
    );

    return {
      ...response.data,
      data: normalizeAsset(response.data.data),
    };
  }

  static async createAsset(
    api: AxiosInstance,
    data: CreateAssetDto
  ): Promise<AssetResponse> {
    const response = await api.post(
      "/assets",
      sanitizePayload(data)
    );

    return {
      ...response.data,
      data: normalizeAsset(response.data.data),
    };
  }

  static async updateAsset(
    api: AxiosInstance,
    id: string,
    data: UpdateAssetDto
  ): Promise<AssetResponse> {
    const response = await api.patch(
      `/assets/${id}`,
      sanitizePayload(data)
    );

    return {
      ...response.data,
      data: normalizeAsset(response.data.data),
    };
  }

  static async deleteAsset(
    api: AxiosInstance,
    id: string
  ): Promise<void> {
    await api.delete(`/assets/${id}`);
  }
}