import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    DATABASE_URL: z.string().url().optional(),

    SINGLESTORE_NAME: z.string().optional(),
    SINGLESTORE_USER: z.string().optional(),
    SINGLESTORE_PASS: z.string().optional(),
    SINGLESTORE_HOST: z.string().optional(),
    SINGLESTORE_PORT: z.string().optional(),
  },

  client: {},

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    SINGLESTORE_NAME: process.env.SINGLESTORE_NAME,
    SINGLESTORE_USER: process.env.SINGLESTORE_USER,
    SINGLESTORE_PASS: process.env.SINGLESTORE_PASS,
    SINGLESTORE_HOST: process.env.SINGLESTORE_HOST,
    SINGLESTORE_PORT: process.env.SINGLESTORE_PORT,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  emptyStringAsUndefined: true,
});
