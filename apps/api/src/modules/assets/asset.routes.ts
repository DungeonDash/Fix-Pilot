import { Router } from "express";

import * as assetController from "./asset.controller.js";

import { authMiddleware } from "../../middleware/auth.js";
import { loadMembership } from "../../middleware/loadMembership.js";
import { requireRole } from "../../middleware/requireRole.js";
import { validate } from "../../middleware/validate.js";

import {
  createAssetSchema,
  updateAssetSchema,
  assetIdSchema,
  assetQuerySchema,
} from "./asset.validation.js";

const router : Router = Router();

router.use(authMiddleware);
router.use(loadMembership);

router.get(
  "/",
  validate(assetQuerySchema, "query"),
  assetController.listAssets
);

router.get(
  "/:id",
  validate(assetIdSchema, "params"),
  assetController.getAssetById
);

router.post(
  "/",
  requireRole(["admin", "dispatcher"]),
  validate(createAssetSchema),
  assetController.createAsset
);

router.patch(
  "/:id",
  requireRole(["admin", "dispatcher"]),
  validate(assetIdSchema, "params"),
  validate(updateAssetSchema),
  assetController.updateAsset
);

router.delete(
  "/:id",
  requireRole(["admin"]),
  validate(assetIdSchema, "params"),
  assetController.deleteAsset
);

export default router;