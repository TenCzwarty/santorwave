import { defineConfig } from "drizzle-kit";

import { env } from "@/env";

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  dialect: "singlestore",
  dbCredentials: {
    database: env.SINGLESTORE_NAME,
    user: env.SINGLESTORE_USER,
    password: env.SINGLESTORE_PASS,
    host: env.SINGLESTORE_HOST,
    port: parseInt(env.SINGLESTORE_PORT),
    ssl: {},
  },
  tablesFilter: ["santorwave_*"],
});
