import type { AxiosInstance } from "axios";

import type {
  AssetFilters,
  AssetListResponse,
  AssetResponse,
  CreateAssetDto,
  UpdateAssetDto,
} from "../types";

export class AssetService {
  static async getAssets(
    api: AxiosInstance,
    filters: AssetFilters = {}
  ): Promise<AssetListResponse> {
    const response = await api.get("/assets", {
      params: filters,
    });

    return response.data;
  }

  static async getAsset(
    api: AxiosInstance,
    id: string
  ): Promise<AssetResponse> {
    const response = await api.get(
      `/assets/${id}`
    );

    return response.data;
  }

  static async createAsset(
    api: AxiosInstance,
    data: CreateAssetDto
  ): Promise<AssetResponse> {
    const response = await api.post(
      "/assets",
      data
    );

    return response.data;
  }

  static async updateAsset(
    api: AxiosInstance,
    id: string,
    data: UpdateAssetDto
  ): Promise<AssetResponse> {
    const response = await api.patch(
      `/assets/${id}`,
      data
    );

    return response.data;
  }

  static async deleteAsset(
    api: AxiosInstance,
    id: string
  ): Promise<void> {
    await api.delete(`/assets/${id}`);
  }
}