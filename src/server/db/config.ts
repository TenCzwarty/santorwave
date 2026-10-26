import { env } from "@/env";

export type SingleStoreCredentials = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};

/**
 * The SINGLESTORE_* vars are optional in `src/env.js` because the app currently
 * renders from `mock.json` and never opens a connection. Anything that really
 * needs one goes through here, so a missing var fails loudly at the call site
 * instead of leaking `undefined` into the mysql2 driver.
 */
export function requireSingleStoreCredentials(): SingleStoreCredentials {
  const raw = {
    SINGLESTORE_HOST: env.SINGLESTORE_HOST,
    SINGLESTORE_PORT: env.SINGLESTORE_PORT,
    SINGLESTORE_USER: env.SINGLESTORE_USER,
    SINGLESTORE_PASS: env.SINGLESTORE_PASS,
    SINGLESTORE_NAME: env.SINGLESTORE_NAME,
  };

  const missing = Object.entries(raw)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(
      `Missing SingleStore configuration: ${missing.join(", ")}. See .env.example.`,
    );
  }

  const port = Number(raw.SINGLESTORE_PORT);
  if (!Number.isInteger(port) || port <= 0) {
    throw new Error(
      `SINGLESTORE_PORT must be a positive integer, got "${raw.SINGLESTORE_PORT}".`,
    );
  }

  return {
    host: raw.SINGLESTORE_HOST!,
    port,
    user: raw.SINGLESTORE_USER!,
    password: raw.SINGLESTORE_PASS!,
    database: raw.SINGLESTORE_NAME!,
  };
}
