import type { Request, Response } from "express";
import { getOrCreateMembership } from "./membership.service.js";

export async function onboardUser(
  req: Request,
  res: Response
) {
  const clerkUserId = req.user?.clerkUserId;

  if (!clerkUserId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const membership = await getOrCreateMembership(
    clerkUserId
  );

  return res.json(membership);
}