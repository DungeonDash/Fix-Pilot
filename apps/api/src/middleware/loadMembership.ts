import type { NextFunction, Request, Response } from "express";
import { Membership } from "../modules/memberships/membership.model.js";

export async function loadMembership(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user?.clerkUserId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const membership = await Membership.findOne({
      clerkUserId: req.user.clerkUserId,
    }).populate("organizationId");

    if (!membership) {
      return res.status(404).json({
        message: "Membership not found",
      });
    }

    req.user = {
      ...req.user,
      membership,
      organizationId: membership.organizationId._id.toString(),
      role: membership.role,
    };

    next();
  } catch (error) {
    next(error);
  }
}