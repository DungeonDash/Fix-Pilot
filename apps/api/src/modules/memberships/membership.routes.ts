import { Router } from "express";
import { onboardUser } from "./membership.controller.js";

const router : Router = Router();

router.post("/onboard", onboardUser);

export default router;