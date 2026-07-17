import express from "express";
import cors from "cors";
import helmet from "helmet";
import { authMiddleware } from "./middleware/auth.js";

const app: express.Express = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(authMiddleware);

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "FS Copilot API",
  });
});

export default app;