import { Router } from "express";

import * as customerController from "./customer.controller.js";

import {
  createCustomerSchema,
  updateCustomerSchema,
  customerQuerySchema,
} from "./customer.validation.js";

import { authMiddleware } from "../../middleware/auth.js";
import { loadMembership } from "../../middleware/loadMembership.js";
import { requireRole } from "../../middleware/requireRole.js";
import { validate } from "../../middleware/validate.js";

const router : Router = Router();

// Authentication & tenant context
router.use(authMiddleware);
router.use(loadMembership);

// Read
router.get(
  "/",
  validate(customerQuerySchema, "query"),
  customerController.listCustomers
);

router.get(
  "/:id",
  customerController.getCustomer
);

// Create
router.post(
  "/",
  requireRole(["admin", "dispatcher"]),
  validate(createCustomerSchema),
  customerController.createCustomer
);

// Update
router.patch(
  "/:id",
  requireRole(["admin", "dispatcher"]),
  validate(updateCustomerSchema),
  customerController.updateCustomer
);

// Delete (soft delete)
router.delete(
  "/:id",
  requireRole(["admin"]),
  customerController.deleteCustomer
);

export default router;