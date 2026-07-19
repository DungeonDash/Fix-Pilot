import type {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";

import * as workOrderService from "./workOrder.service.js";

import type {
  CreateWorkOrderDto,
  UpdateWorkOrderDto,
  WorkOrderQueryDto,
} from "./workOrder.validation.js";

import { NotFoundError } from "../../shared/errors/NotFoundError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const createWorkOrder: RequestHandler = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {   

    const user = (req as any).user;
    console.log("Here is the user: ", user);

    if (!user || !user.organizationId || !user.clerkUserId) {
      throw new Error("User information is required");
    }

    const workOrder = await workOrderService.createWorkOrder(
      user.organizationId,
      user.clerkUserId,
      req.body as CreateWorkOrderDto
    );

    res.status(201).json({
      success: true,
      data: workOrder,
    });
  } catch (error) {
    next(error);
  }
});

export const getWorkOrder: RequestHandler = asyncHandler(async (
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

    if (!id) {
      throw new Error("Work Order ID is required");
    }

    const workOrder = await workOrderService.getWorkOrderById(
      user.organizationId,
      id
    );

    if (!workOrder) {
      throw new NotFoundError("Work order not found");
    }

    res.json({
      success: true,
      data: workOrder,
    });
  } catch (error) {
    next(error);
  }
});

export const listWorkOrders: RequestHandler = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;

    if (!user || !user.organizationId) {
      throw new Error("User information is required");
    }

    const result = await workOrderService.listWorkOrders(
      user.organizationId,
      req.query as unknown as WorkOrderQueryDto
    );

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
});

export const updateWorkOrder: RequestHandler = asyncHandler(async (
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

    if (!id) {
      throw new Error("Work Order ID is required");
    }

    const workOrder = await workOrderService.updateWorkOrder(
      user.organizationId,
      id,
      req.body as UpdateWorkOrderDto
    );

    if (!workOrder) {
      throw new NotFoundError("Work order not found");
    }

    res.json({
      success: true,
      data: workOrder,
    });
  } catch (error) {
    next(error);
  }
});

export const deleteWorkOrder: RequestHandler = asyncHandler(async (
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

    if (!id) {
      throw new Error("Work Order ID is required");
    }

    await workOrderService.deleteWorkOrder(
      user.organizationId,
      id
    );

    res.json({
      success: true,
      message: "Work order deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});