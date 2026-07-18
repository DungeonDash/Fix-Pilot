import { Schema, model } from "mongoose";
import type {
  HydratedDocument,
  Types,
} from "mongoose";

export interface ICustomer {
  organizationId: Types.ObjectId;

  name: string;

  email?: string | undefined;

  phone: string;

  address?: string | undefined;

  city?: string | undefined;

  state?: string | undefined;

  country?: string | undefined;

  postalCode?: string | undefined;

  notes?: string | undefined;

  createdBy: string;

  updatedBy?: string | undefined;

  isDeleted: boolean;
}

export type CustomerDocument =
  HydratedDocument<ICustomer>;

const customerSchema = new Schema<ICustomer>(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      trim: true,
    },

    state: {
      type: String,
      trim: true,
    },

    country: {
      type: String,
      trim: true,
    },

    postalCode: {
      type: String,
      trim: true,
    },

    notes: {
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
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
customerSchema.index({
  organizationId: 1,
  name: 1,
});

customerSchema.index({
  organizationId: 1,
  email: 1,
});

customerSchema.index({
  organizationId: 1,
  phone: 1,
});

customerSchema.index({
  organizationId: 1,
  isDeleted: 1,
});

export const Customer = model<ICustomer>(
  "Customer",
  customerSchema
);