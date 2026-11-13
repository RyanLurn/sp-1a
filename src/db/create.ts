import type { Result } from "@little-nebulae/result";
import type { ZodParseError } from "@little-nebulae/zod";
import type { NeonQueryFunction } from "@neondatabase/serverless";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";

import { succeed } from "@little-nebulae/result";
import { wrapZodResult } from "@little-nebulae/zod";
import { neon } from "@neondatabase/serverless";
import { createServerOnlyFn } from "@tanstack/react-start";
import { drizzle } from "drizzle-orm/neon-http";
import { z } from "zod";

import { relations } from "@/db/relations";

const DbEnvSchema = z.object({
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

export type Db = NeonHttpDatabase<typeof relations> & {
  $client: NeonQueryFunction<false, false>;
};
export const createDb = createServerOnlyFn(
  (): Result<Db, ZodParseError<DbEnv>> => {
    const parseEnvResult = wrapZodResult(DbEnvSchema.safeParse(process.env));
    if (!parseEnvResult.success) {
      return parseEnvResult;
    }
    const { NEON_POOLED_CONNECTION_STRING } = parseEnvResult.data;

    const client = neon(NEON_POOLED_CONNECTION_STRING);
    const db = drizzle({ client, relations });
    return succeed(db);
  },
);
