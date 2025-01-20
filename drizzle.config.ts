import "dotenv/config";
import { defineConfig } from "drizzle-kit";

import { env } from "@/configs/env";

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
