import { Membership } from "../memberships/membership.model.js";
import { Organization } from "../organizations/organization.model.js";

export async function ensureMembership(
  clerkUserId: string
) {
  let membership = await Membership.findOne({
    clerkUserId,
  }).populate("organizationId");

  if (membership) {
    return membership;
  }

  const organization = await Organization.create({
    name: "My Organization",
  });

  membership = await Membership.create({
    clerkUserId,
    organizationId: organization._id,
    role: "admin",
  });

  return Membership.findById(membership._id)
    .populate("organizationId")
    .orFail();
}

export async function onboardUser(clerkUserId: string) {
  return ensureMembership(clerkUserId);
}
