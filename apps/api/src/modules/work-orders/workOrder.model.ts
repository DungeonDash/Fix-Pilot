import type {
  HydratedDocument,
  InferSchemaType,
} from "mongoose";

import {
  Model,
  Schema,
  model,
} from "mongoose";

export const WORK_ORDER_PRIORITY = [
  "low",
  "medium",
  "high",
  "urgent",
] as const;

export const WORK_ORDER_STATUS = [
  "open",
  "assigned",
  "in_progress",
  "on_hold",
  "completed",
  "cancelled",
] as const;

export type WorkOrderPriority =
  (typeof WORK_ORDER_PRIORITY)[number];

export type WorkOrderStatus =
  (typeof WORK_ORDER_STATUS)[number];

const workOrderSchema = new Schema(
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

    assetId: {
      type: Schema.Types.ObjectId,
      ref: "Asset",
      required: true,
      index: true,
    },

    workOrderNumber: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    priority: {
      type: String,
      enum: WORK_ORDER_PRIORITY,
      default: "medium",
      index: true,
    },

    status: {
      type: String,
      enum: WORK_ORDER_STATUS,
      default: "open",
      index: true,
    },

    assignedTechnicianId: {
      type: String,
      default: null,
      index: true,
    },

    scheduledStart: Date,

    scheduledEnd: Date,

    startedAt: Date,

    completedAt: Date,

    estimatedHours: {
      type: Number,
      min: 0,
    },

    actualHours: {
      type: Number,
      min: 0,
    },

    notes: {
      type: String,
      trim: true,
    },

    resolution: {
      type: String,
      trim: true,
    },

    createdBy: {
      type: String,
      required: true,
    },

    updatedBy: String,

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

workOrderSchema.index({
  organizationId: 1,
  workOrderNumber: 1,
});

workOrderSchema.index({
  organizationId: 1,
  status: 1,
});

workOrderSchema.index({
  organizationId: 1,
  priority: 1,
});

workOrderSchema.index({
  organizationId: 1,
  customerId: 1,
});

workOrderSchema.index({
  organizationId: 1,
  assetId: 1,
});

workOrderSchema.index({
  organizationId: 1,
  assignedTechnicianId: 1,
});

workOrderSchema.index({
  organizationId: 1,
  isDeleted: 1,
});

export type WorkOrder = InferSchemaType<typeof workOrderSchema>;

export type WorkOrderDocument =
  HydratedDocument<WorkOrder>;

export const WorkOrderModel = model<WorkOrder>(
  "WorkOrder",
  workOrderSchema
);