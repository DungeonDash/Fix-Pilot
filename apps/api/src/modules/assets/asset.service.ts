import { Types } from "mongoose";

import { AssetModel } from "./asset.model.js";
import { Customer } from "../customers/customer.model.js";
import { NotFoundError } from "../../shared/errors/NotFoundError.js";
import { BadRequestError } from "../../shared/errors/BadRequestError.js";


import type {
  z,
} from "zod";

import type {
  createAssetSchema,
  updateAssetSchema,
  assetQuerySchema,
} from "./asset.validation.js";

type CreateAssetDto = z.infer<typeof createAssetSchema>;
type UpdateAssetDto = z.infer<typeof updateAssetSchema>;
type AssetQueryDto = z.infer<typeof assetQuerySchema>;

export async function createAsset(
  organizationId: string,
  clerkUserId: string,
  data: CreateAssetDto
) {
  // Verify customer exists in this organization

  const customer = await Customer.findOne({
    _id: data.customerId,
    organizationId,
    isDeleted: false,
  });

  if (!customer) {
    throw new NotFoundError("Customer not found");
  }

  // Prevent duplicate asset codes

  const existingAsset = await AssetModel.findOne({
    organizationId,
    assetCode: data.assetCode,
    isDeleted: false,
  });

  if (existingAsset) {
    throw new BadRequestError("Asset code already exists");
  }

  const payload = {
    organizationId,
    createdBy: clerkUserId,

    ...Object.fromEntries(
      Object.entries(data).filter(
        ([, value]) => value !== undefined
      )
    ),
  };

  console.log("Creating Asset:", payload);
  
  return AssetModel.create(payload);
}

export async function listAssets(
  organizationId: string,
  query: AssetQueryDto
) {
  const {
    page,
    limit,
    search,
    customerId,
    category,
    status,
  } = query;

  const filter: Record<string, unknown> = {
    organizationId,
    isDeleted: false,
  };

  if (search) {
    filter.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        assetCode: {
          $regex: search,
          $options: "i",
        },
      },
      {
        serialNumber: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (customerId) {
    filter.customerId = new Types.ObjectId(customerId);
  }

  if (category) {
    filter.category = category;
  }

  if (status) {
    filter.status = status;
  }

  const skip = (page - 1) * limit;

  const [assets, total] = await Promise.all([
    AssetModel.find(filter)
      .populate("customerId", "name email phone")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    AssetModel.countDocuments(filter),
  ]);

  return {
    assets,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getAssetById(
  organizationId: string,
  id: string
) {
  const asset = await AssetModel.findOne({
    _id: id,
    organizationId,
    isDeleted: false,
  }).populate("customerId", "name email phone");

  if (!asset) {
    throw new NotFoundError("Asset not found");
  }

  return asset;
}

export async function updateAsset(
  organizationId: string,
  clerkUserId: string,
  id: string,
  data: UpdateAssetDto
) {
  const asset = await AssetModel.findOne({
    _id: id,
    organizationId,
    isDeleted: false,
  });

  if (!asset) {
    throw new NotFoundError("Asset not found");
  }

  if (
    data.customerId &&
    data.customerId.toString() !== asset.customerId.toString()
  ) {
    const customer = await Customer.findOne({
      _id: data.customerId,
      organizationId,
      isDeleted: false,
    });

    if (!customer) {
      throw new NotFoundError("Customer not found");
    }
  }

  if (
    data.assetCode &&
    data.assetCode !== asset.assetCode
  ) {
    const duplicate = await AssetModel.findOne({
      organizationId,
      assetCode: data.assetCode,
      isDeleted: false,
      _id: { $ne: asset._id },
    });

    if (duplicate) {
      throw new BadRequestError("Asset code already exists");
    }
  }

  Object.assign(asset, {
    ...Object.fromEntries(
      Object.entries(data).filter(
        ([, value]) => value !== undefined
      )
    ),
    updatedBy: clerkUserId,
  });

  return asset.save();
}

export async function deleteAsset(
  organizationId: string,
  clerkUserId: string,
  id: string
) {
  const asset = await AssetModel.findOne({
    _id: id,
    organizationId,
    isDeleted: false,
  });

  if (!asset) {
    throw new NotFoundError("Asset not found");
  }

  asset.isDeleted = true;
  asset.updatedBy = clerkUserId;

  await asset.save();
}