import { z } from "zod";

export const assetStatus = [
  "active",
  "inactive",
  "maintenance",
  "retired",
] as const;

export const assetSchema = z.object({
  customerId: z.string().min(1, "Customer is required"),

  name: z.string().min(1, "Asset name is required"),

  assetCode: z.string().min(1, "Asset code is required"),

  serialNumber: z.string().optional(),

  manufacturer: z.string().optional(),

  model: z.string().optional(),

  category: z.string().optional(),

  purchaseDate: z.string().optional(),

  installationDate: z.string().optional(),

  warrantyExpiry: z.string().optional(),

  location: z.string().optional(),

  status: z.enum(assetStatus),

  notes: z.string().optional(),

  qrCode: z.string().optional(),

  barcode: z.string().optional(),
});

export type AssetFormValues = z.infer<
  typeof assetSchema
>;

export const defaultAssetValues: AssetFormValues =
{
  customerId: "",

  name: "",

  assetCode: "",

  serialNumber: "",

  manufacturer: "",

  model: "",

  category: "",

  purchaseDate: "",

  installationDate: "",

  warrantyExpiry: "",

  location: "",

  status: "active",

  notes: "",

  qrCode: "",

  barcode: "",
};