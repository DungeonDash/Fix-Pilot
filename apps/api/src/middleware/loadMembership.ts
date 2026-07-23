import type { NextFunction, Request, Response } from "express";

import { Membership } from "../modules/memberships/membership.model.js";
import { Organization } from "../modules/organizations/organization.model.js";
import { Roles } from "../shared/constants/role.js";

export async function loadMembership(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    // console.log("=== loadMembership ===");
    // console.log("User:", req.user);

    if (!req.user?.clerkUserId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // console.log("Finding membership...");

    let membership = await Membership.findOne({
      clerkUserId: req.user.clerkUserId,
    }).populate("organizationId");

//     console.log("Membership:", membership);

//     console.log("Creating organization...");
// console.log("Creating membership...");

    if (!membership) {
      const organization = await Organization.create({
        name: "My Organization",
      });

      membership = await Membership.create({
        clerkUserId: req.user.clerkUserId,
        organizationId: organization._id,
        role: Roles.ADMIN,
      });

      membership = await Membership.findById(
        membership._id
      ).populate("organizationId");
    }

    // console.log("Final membership:", membership);

    if (!membership?.organizationId) {
      return res.status(500).json({
        message: "Organization not found",
      });
    }

    const normalizedRole =
      membership.role === "admin"
        ? Roles.ADMIN
        : membership.role;

    if (normalizedRole !== membership.role) {
      membership.role = normalizedRole;
    }

    req.user = {
      ...req.user,
      membership,
      organizationId: membership.organizationId._id.toString(),
      role: normalizedRole,
    };

    next();
  }  catch (error) {
  console.error("loadMembership error:", error);
  next(error);
}
}
