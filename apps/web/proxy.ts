import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/",
  "/overview(.*)",
  "/work-orders(.*)",
  "/customers(.*)",
  "/assets(.*)",
  "/schedule(.*)",
  "/settings(.*)",
  "/ai-copilot(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  console.log("Proxy executed"); // 👈 Add this line

  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
    "/(api|trpc)(.*)",
  ],
};