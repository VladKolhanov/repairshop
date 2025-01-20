import { z } from "zod";
import { config } from "dotenv";

config({ path: ".env.local" });

const envSchema = z.object({
  DATABASE_URL: z.string(),
});

export const env = envSchema.parse(process.env);
