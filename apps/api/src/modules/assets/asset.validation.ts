import { z } from "zod";
import { Types } from "mongoose";
import { ASSET_STATUS } from "./asset.model.js";

const objectId = z.string().refine(
  (value) => Types.ObjectId.isValid(value),
  {
    message: "Invalid ObjectId",
  }
);

export const createAssetSchema = z.object({
  customerId: objectId,

  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100),

  assetCode: z
    .string()
    .trim()
    .min(1, "Asset code is required")
    .max(50),

  serialNumber: z
    .string()
    .trim()
    .max(100)
    .optional(),

  manufacturer: z
    .string()
    .trim()
    .max(100)
    .optional(),

  model: z
    .string()
    .trim()
    .max(100)
    .optional(),

  category: z
    .string()
    .trim()
    .max(100)
    .optional(),

  purchaseDate: z.coerce.date().optional(),

  installationDate: z.coerce.date().optional(),

  warrantyExpiry: z.coerce.date().optional(),

  location: z
    .string()
    .trim()
    .max(200)
    .optional(),

  status: z
    .enum(ASSET_STATUS)
    .optional(),

  notes: z
    .string()
    .trim()
    .max(1000)
    .optional(),

  qrCode: z
    .string()
    .trim()
    .max(255)
    .optional(),

  barcode: z
    .string()
    .trim()
    .max(255)
    .optional(),
});

export const updateAssetSchema = createAssetSchema.partial();

export const assetIdSchema = z.object({
  id: objectId,
});

export const assetQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),

  limit: z.coerce.number().int().positive().max(100).default(10),

  search: z.string().optional(),

  customerId: objectId.optional(),

  category: z.string().optional(),

  status: z.enum(ASSET_STATUS).optional(),
});


export type CreateAssetDto =
  z.infer<typeof createAssetSchema>;

export type UpdateAssetDto =
  z.infer<typeof updateAssetSchema>;

export type AssetQueryDto =
  z.infer<typeof assetQuerySchema>;