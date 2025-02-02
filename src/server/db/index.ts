import { drizzle } from "drizzle-orm/singlestore";
import { createPool, type Pool } from "mysql2/promise";

import { env } from "@/env";

import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  connection: Pool | undefined;
};

const connection =
  globalForDb.connection ??
  createPool({
    database: env.SINGLESTORE_NAME,
    user: env.SINGLESTORE_USER,
    password: env.SINGLESTORE_PASS,
    host: env.SINGLESTORE_HOST,
    port: parseInt(env.SINGLESTORE_PORT),
    ssl: {},
    maxIdle: 0,
  });

if (env.NODE_ENV !== "production") globalForDb.connection = connection;

connection.addListener("error", (err) => {
  console.error("Database connection error:", err);
});

export const db = drizzle(connection, { schema });
