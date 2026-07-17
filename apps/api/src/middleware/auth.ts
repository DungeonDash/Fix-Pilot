import { verifyToken } from "@clerk/backend";
import type { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        clerkUserId: string;
        sessionId?: string;
      };
    }
  }
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Missing bearer token",
      });
    }

    const token = authorization.replace("Bearer ", "");

    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
    });

    req.user = {
      clerkUserId: payload.sub!,
      sessionId: payload.sid,
    };

    next();
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      message: "Unauthorized",
    });
  }
}