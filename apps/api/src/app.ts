import express from "express";
import cors from "cors";
import helmet from "helmet";
import { authMiddleware } from "./middleware/auth.js";
import { errorHandler } from "./middleware/errorHandler.js";
import membershipRoutes from "./modules/memberships/membership.routes.js";
import customerRoutes from "./modules/customers/customer.routes.js";
import assetRoutes from "./modules/assets/asset.routes.js";
import workOrderRoutes from "./modules/work-orders/workOrder.routes.js";
import onboardingRoutes from "./modules/onboarding/onboarding.routes.js";

const app: express.Express = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(authMiddleware);


// Routes
app.use("/api/memberships", membershipRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/work-orders", workOrderRoutes);
app.use("/api/onboarding", onboardingRoutes);


app.use(errorHandler);


app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "FS Copilot API",
  });
});

app.get("/debug-auth", (req, res) => {
  res.json(req.user);
});

export default app;