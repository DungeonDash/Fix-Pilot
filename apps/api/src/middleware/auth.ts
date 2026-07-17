import { clerkMiddleware } from "@clerk/express";
import type { RequestHandler } from "express";

export const authMiddleware: RequestHandler = clerkMiddleware();