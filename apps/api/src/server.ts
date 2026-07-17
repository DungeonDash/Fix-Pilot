import "dotenv/config";
console.log("Secret:", process.env.CLERK_SECRET_KEY ? "Loaded" : "Missing");
console.log("Publishable:", process.env.CLERK_PUBLISHABLE_KEY ? "Loaded" : "Missing");

import app from "./app.js";
import { connectDatabase } from "./config/database.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`🚀 API running on port ${PORT}`);
  });
}

console.log({
  publishable: process.env.CLERK_PUBLISHABLE_KEY,
  secret: process.env.CLERK_SECRET_KEY,
});

startServer();