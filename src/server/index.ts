import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { createClient } from "@supabase/supabase-js";
import * as Sentry from "@sentry/node";
import { avatarRoutes } from "./routes/avatar";
import { authRoutes } from "./routes/auth";
import { config, logger, rateLimiter } from "./config";

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());

// Sentry error tracking
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

// Rate limiting
app.use(async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch {
    res.status(429).json({ error: "Too Many Requests" });
  }
});

// Initialize Supabase
export const supabase = createClient(config.supabaseUrl!, config.supabaseKey!);

// Routes
app.use("/api/avatars", avatarRoutes);
app.use("/api/auth", authRoutes);

// Error handling
app.use((err: any, req: any, res: any, next: any) => {
  logger.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
});

export default app;
