import { drizzle } from "drizzle-orm/singlestore";
import { createPool, type Pool } from "mysql2/promise";

import { env } from "@/env";

import { requireSingleStoreCredentials } from "./config";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  connection: Pool | undefined;
};

function createConnection(): Pool {
  const connection = createPool({
    ...requireSingleStoreCredentials(),
    ssl: {},
    maxIdle: 0,
  });

  connection.addListener("error", (err) => {
    console.error("Database connection error:", err);
  });

  return connection;
}

/**
 * Connect lazily. Importing this module must not require a configured database —
 * the app is currently served from `mock.json`, so the pool is only built when
 * something actually queries.
 */
export function getDb() {
  const connection = globalForDb.connection ?? createConnection();

  if (env.NODE_ENV !== "production") globalForDb.connection = connection;

  return drizzle(connection, { schema });
}
