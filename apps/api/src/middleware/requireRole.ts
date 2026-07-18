import type { NextFunction, Request, Response } from "express";

type Role = "admin" | "dispatcher" | "technician";

export function requireRole(roles: Role[]) {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if (!req.user?.role) {
            return res.status(401).json({
                message: "User role not found",
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Forbidden",
            });
        }

        next();
    };
}