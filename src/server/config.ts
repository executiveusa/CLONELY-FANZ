import * as admin from "firebase-admin";
import dotenv from "dotenv";
import { Storage } from "@google-cloud/storage";
import winston from "winston";
import * as Sentry from "@sentry/node";
import { RateLimiterMemory } from "rate-limiter-flexible";

dotenv.config();

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  });
}

// Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

// Initialize Google Cloud Storage
export const storage = new Storage({
  keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE,
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
});

// Initialize Winston logger
export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

// Rate limiter setup
export const rateLimiter = new RateLimiterMemory({
  points: 10,
  duration: 1,
});

// Export Firebase Admin instances
export const auth = admin.auth();
export const db = admin.firestore();
export const fbStorage = admin.storage();

// Export environment variables
export const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 8000,
  jwtSecret: process.env.JWT_SECRET || "your-jwt-secret",
  gcpBucket: process.env.VITE_GOOGLE_CLOUD_BUCKET,
};
