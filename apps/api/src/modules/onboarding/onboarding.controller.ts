import type {
  Request,
  Response,
  RequestHandler,
} from "express";

import { asyncHandler } from "../../utils/asyncHandler.js";

const onboardUser = async (clerkUserId: string) => {
  return {
    id: `membership_${clerkUserId}`,
    clerkUserId,
    status: "active",
    createdAt: new Date().toISOString(),
  };
};

export const onboard: RequestHandler =
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;

    if (!user?.clerkUserId) {
      throw new Error("Unauthorized");
    }

    const membership = await onboardUser(user.clerkUserId);

    res.status(200).json({
      success: true,
      membership,
    });
  });