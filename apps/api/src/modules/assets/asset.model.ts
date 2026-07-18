import type {
  HydratedDocument,
  InferSchemaType,

} from "mongoose";

import {
  Model,
  Schema,
  Types,
  model,
} from "mongoose";


export const ASSET_STATUS = [
  "active",
  "inactive",
  "maintenance",
  "retired",
] as const;

export type AssetStatus = (typeof ASSET_STATUS)[number];

const assetSchema = new Schema(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },

    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    assetCode: {
      type: String,
      required: true,
      trim: true,
    },

    serialNumber: {
      type: String,
      trim: true,
    },

    manufacturer: {
      type: String,
      trim: true,
    },

    model: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      trim: true,
    },

    purchaseDate: {
      type: Date,
    },

    installationDate: {
      type: Date,
    },

    warrantyExpiry: {
      type: Date,
    },

    location: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ASSET_STATUS,
      default: "active",
    },

    notes: {
      type: String,
      trim: true,
    },

    qrCode: {
      type: String,
      trim: true,
    },

    barcode: {
      type: String,
      trim: true,
    },

    createdBy: {
      type: String,
      required: true,
    },

    updatedBy: {
      type: String,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

assetSchema.index({
  organizationId: 1,
  assetCode: 1,
});

assetSchema.index({
  organizationId: 1,
  customerId: 1,
});

assetSchema.index({
  organizationId: 1,
  serialNumber: 1,
});

assetSchema.index({
  organizationId: 1,
  status: 1,
});

assetSchema.index({
  organizationId: 1,
  isDeleted: 1,
});

export type Asset = InferSchemaType<typeof assetSchema>;

export type AssetDocument = HydratedDocument<Asset>;

export const AssetModel = model<Asset>(
  "Asset",
  assetSchema
);