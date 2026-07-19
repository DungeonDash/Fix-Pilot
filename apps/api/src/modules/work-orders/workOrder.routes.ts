import { Router } from "express";

import * as workOrderController from "./workOrder.controller.js";

import { authMiddleware } from "../../middleware/auth.js";
import { loadMembership } from "../../middleware/loadMembership.js";
import { validate } from "../../middleware/validate.js";

import {
  createWorkOrderSchema,
  updateWorkOrderSchema,
  workOrderIdSchema,
  workOrderQuerySchema,
} from "./workOrder.validation.js";

const router : Router = Router();

router.use(authMiddleware);
router.use(loadMembership);

router.post(
  "/",
  validate(createWorkOrderSchema, "body"),
  workOrderController.createWorkOrder
);

router.get(
  "/",
  validate(workOrderQuerySchema, "query"),
  workOrderController.listWorkOrders
);

router.get(
  "/:id",
  validate(workOrderIdSchema, "params"),
  workOrderController.getWorkOrder
);

router.patch(
  "/:id",
  validate(workOrderIdSchema, "params"),
  validate(updateWorkOrderSchema, "body"),
  workOrderController.updateWorkOrder
);

router.delete(
  "/:id",
  validate(workOrderIdSchema, "params"),
  workOrderController.deleteWorkOrder
);

export default router;