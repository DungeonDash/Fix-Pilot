import { Types } from "mongoose";
import { z } from "zod";

import {
  WORK_ORDER_PRIORITY,
  WORK_ORDER_STATUS,
} from "./workOrder.model.js";

const objectId = z.string().refine(
  (value) => Types.ObjectId.isValid(value),
  {
    message: "Invalid ObjectId",
  }
);

export const createWorkOrderSchema = z.object({
  customerId: objectId,

  assetId: objectId,

  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(150),

  description: z
    .string()
    .trim()
    .max(2000)
    .optional(),

  priority: z
    .enum(WORK_ORDER_PRIORITY)
    .optional(),

  assignedTechnicianId: z
    .string()
    .trim()
    .optional(),

  scheduledStart: z.coerce.date().optional(),

  scheduledEnd: z.coerce.date().optional(),

  estimatedHours: z
    .number()
    .min(0)
    .optional(),

  notes: z
    .string()
    .trim()
    .max(2000)
    .optional(),
});

export const updateWorkOrderSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1)
    .max(150)
    .optional(),

  description: z
    .string()
    .trim()
    .max(2000)
    .optional(),

  priority: z
    .enum(WORK_ORDER_PRIORITY)
    .optional(),

  assignedTechnicianId: z
    .string()
    .trim()
    .optional(),

  scheduledStart: z.coerce.date().optional(),

  scheduledEnd: z.coerce.date().optional(),

  estimatedHours: z
    .number()
    .min(0)
    .optional(),

  notes: z
    .string()
    .trim()
    .max(2000)
    .optional(),
});

export const workOrderIdSchema = z.object({
  id: objectId,
});

export const workOrderQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),

  limit: z.coerce.number().int().positive().max(100).default(10),

  search: z.string().optional(),

  customerId: objectId.optional(),

  assetId: objectId.optional(),

  priority: z
    .enum(WORK_ORDER_PRIORITY)
    .optional(),

  status: z
    .enum(WORK_ORDER_STATUS)
    .optional(),
});

export type CreateWorkOrderDto =
  z.infer<typeof createWorkOrderSchema>;

export type UpdateWorkOrderDto =
  z.infer<typeof updateWorkOrderSchema>;

export type WorkOrderQueryDto =
  z.infer<typeof workOrderQuerySchema>;