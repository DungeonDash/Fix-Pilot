export const Roles = {
  ADMIN: "admin",
  DISPATCHER: "dispatcher",
  TECHNICIAN: "technician",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];

export const ROLE_VALUES = Object.values(Roles);