import type { GroqProvider } from "@ai-sdk/groq";
import type { Result } from "@little-nebulae/result";
import type { ZodParseError } from "@little-nebulae/zod";

import { createGroq } from "@ai-sdk/groq";
import { succeed } from "@little-nebulae/result";
import { wrapZodResult } from "@little-nebulae/zod";
import { NonEmptyStringSchema } from "@little-nebulae/zod-schemas";
import { z } from "zod";

const GroqEnvSchema = z.object({
  GROQ_API_KEY: z.templateLiteral(["gsk_", NonEmptyStringSchema]),
});
type GroqEnv = z.infer<typeof GroqEnvSchema>;

export function createGroqProvider(): Result<
  GroqProvider,
  ZodParseError<GroqEnv>
> {
  const parseEnvResult = wrapZodResult(GroqEnvSchema.safeParse(process.env));
  if (!parseEnvResult.success) {
    return parseEnvResult;
  }
  const { GROQ_API_KEY } = parseEnvResult.data;

  const groqProvider = createGroq({ apiKey: GROQ_API_KEY });
  return succeed(groqProvider);
}
