import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { env } from "@/configs/env";

const sql = neon(env.DATABASE_URL);
const db = drizzle(sql);

export { db };
