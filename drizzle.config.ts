import { defineConfig } from "drizzle-kit";

import { requireSingleStoreCredentials } from "@/server/db/config";

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  dialect: "singlestore",
  dbCredentials: {
    ...requireSingleStoreCredentials(),
    ssl: {},
  },
  tablesFilter: ["santorwave_*"],
});
