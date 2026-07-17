import express from "express";
import cors from "cors";
import helmet from "helmet";
import { authMiddleware } from "./middleware/auth.js";
import membershipRoutes from "./modules/memberships/membership.routes.js";

const app: express.Express = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(authMiddleware);


// Routes
app.use("/api/memberships", membershipRoutes);



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