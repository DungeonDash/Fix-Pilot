import { Organization } from "../organizations/organization.model.js";
import { Membership } from "./membership.model.js";
import { Roles } from "../../shared/constants/role.js";

export async function getOrCreateMembership(
  clerkUserId: string,
  organizationName?: string
) {
  const existingMembership = await Membership.findOne({
    clerkUserId,
  }).populate("organizationId");

  if (existingMembership) {
    return existingMembership;
  }

  const organization = await Organization.create({
    name: organizationName ?? "My Organization",
  });

  const membership = await Membership.create({
    clerkUserId,
    organizationId: organization._id,
    role: Roles.ADMIN,
  });

  return Membership.findById(membership._id).populate("organizationId");
}