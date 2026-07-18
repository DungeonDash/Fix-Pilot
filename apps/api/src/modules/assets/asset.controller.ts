import type { Request, Response, NextFunction, RequestHandler } from "express";

import { asyncHandler } from "../../utils/asyncHandler.js";
import * as assetService from "./asset.service.js";

import type {
  CreateAssetDto,
  UpdateAssetDto,
  AssetQueryDto,
} from "./asset.validation.js";

export const createAsset: RequestHandler = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;

    if (!user || !user.organizationId || !user.clerkUserId) {
      throw new Error("User information is required");
    }

    const asset = await assetService.createAsset(
      user.organizationId,
      user.clerkUserId,
      req.body as CreateAssetDto
    );

    res.status(201).json({
      success: true,
      data: asset,
    });
  } catch (error) {
    next(error);
  }
});

export const listAssets: RequestHandler = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;

    if (!user || !user.organizationId) {
      throw new Error("User information is required");
    }

    const result = await assetService.listAssets(
      user.organizationId,
      req.query as unknown as AssetQueryDto
    );

    res.status(200).json({
      success: true,
      data: result.assets,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
});

export const getAssetById: RequestHandler = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;

    if (!user || !user.organizationId) {
      throw new Error("User information is required");
    }

    const { id } = req.params;
    if (!id) throw new Error("Asset id is required");

    const asset = await assetService.getAssetById(
      user.organizationId,
      id
    );

    res.status(200).json({
      success: true,
      data: asset,
    });
  } catch (error) {
    next(error);
  }
});

export const updateAsset: RequestHandler = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;

    if (!user || !user.organizationId || !user.clerkUserId) {
      throw new Error("User information is required");
    }

    const { id } = req.params;
    if (!id) throw new Error("Asset id is required");

    const asset = await assetService.updateAsset(
      user.organizationId,
      user.clerkUserId,
      id,
      req.body as UpdateAssetDto
    );

    res.status(200).json({
      success: true,
      data: asset,
    });
  } catch (error) {
    next(error);
  }
});

export const deleteAsset: RequestHandler = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;

    if (!user || !user.organizationId || !user.clerkUserId) {
      throw new Error("User information is required");
    }

    const { id } = req.params;
    if (!id) throw new Error("Asset id is required");

    await assetService.deleteAsset(
      user.organizationId,
      user.clerkUserId,
      id
    );

    res.status(200).json({
      success: true,
      message: "Asset deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});