import { neon } from "@neondatabase/serverless";
import { createServerOnlyFn } from "@tanstack/react-start";
import { drizzle } from "drizzle-orm/neon-http";
import { z } from "zod";

import { relations } from "@/db/relations";

export const DbEnvSchema = z.object({
  NEON_POOLED_CONNECTION_STRING: z.templateLiteral(
    [
      "postgresql://",
      z.string().min(1),
      ":",
      z.string().min(1),
      "@",
      z.string().min(1),
      "-pooler.",
      z.string().min(1),
      ".neon.tech/",
      z.string().min(1),
    ],
    { error: "Invalid or missing Neon pooled connection string." },
  ),
});
type DbEnv = z.infer<typeof DbEnvSchema>;

export const createDb = createServerOnlyFn(
  ({
    connectionString,
  }: {
    connectionString: DbEnv["NEON_POOLED_CONNECTION_STRING"];
  }) => {
    const client = neon(connectionString);
    const db = drizzle({ client, relations });
    return db;
  },
);
export type Db = ReturnType<typeof createDb>;
