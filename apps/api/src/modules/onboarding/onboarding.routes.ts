import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.js";

import * as controller from "./onboarding.controller.js";

const router:Router = Router();

router.post(
  "/",
  authMiddleware,
  controller.onboard
);

export default router;