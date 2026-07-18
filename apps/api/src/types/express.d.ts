import { MembershipDocument } from "../modules/memberships/membership.model";

declare global {
  namespace Express {
    interface Request {
      user?: {
        clerkUserId: string;
        sessionId?: string;
        organizationId?: string;
        role?: "admin" | "dispatcher" | "technician";
        membership?: MembershipDocument;
      };
    }
  }
}

export {};