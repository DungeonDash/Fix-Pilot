import { Schema, model } from "mongoose";
import { ROLE_VALUES } from "../../shared/constants/role.js";

const membershipSchema = new Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
    },

    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },

    role: {
      type: String,
      enum: ROLE_VALUES,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

membershipSchema.index(
  {
    organizationId: 1,
    clerkUserId: 1,
  },
  {
    unique: true,
  }
);

export const Membership = model(
  "Membership",
  membershipSchema
);