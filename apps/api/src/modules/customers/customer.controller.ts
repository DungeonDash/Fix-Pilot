import type { Request, Response, NextFunction, RequestHandler } from "express";
import * as customerService from "./customer.service.js";
import type {
  CreateCustomerDto,
  UpdateCustomerDto,
  CustomerQueryDto,
} from "./customer.validation.js";
import { NotFoundError } from "../../shared/errors/NotFoundError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const createCustomer: RequestHandler = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;
    if (!user || !user.organizationId || !user.clerkUserId) {
      throw new Error("User information is required");
    }
    const customer = await customerService.createCustomer(
      user.organizationId,
      user.clerkUserId,
      req.body as CreateCustomerDto
    );

    res.status(201).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
})

export const getCustomer : RequestHandler = asyncHandler(async (
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
      throw new Error("Customer ID is required");
    }

    const customer = await customerService.getCustomerById(
      id,
      user.organizationId
    );

    if (!customer) {
      throw new NotFoundError("Customer not found");
    }

    res.json({
      success: true,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
})

export const listCustomers : RequestHandler = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;
    if (!user || !user.organizationId) {
      throw new Error("User information is required");
    }

    const result = await customerService.listCustomers(
      user.organizationId,
      req.query as unknown as CustomerQueryDto
    );

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
})

export const updateCustomer : RequestHandler = asyncHandler(async (
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
      throw new Error("Customer ID is required");
    }

    const customer = await customerService.updateCustomer(
      id,
      user.organizationId,
      user.clerkUserId,
      req.body as UpdateCustomerDto
    );

    if (!customer) {
      throw new NotFoundError("Customer not found");
    }

    res.json({
      success: true,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
})

export const deleteCustomer : RequestHandler = asyncHandler(async (
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
      throw new Error("Customer ID is required");
    }

    const customer = await customerService.deleteCustomer(
      id,
      user.organizationId
    );

    if (!customer) {
      throw new NotFoundError("Customer not found");
    }

    res.json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    next(error);
  }
})
