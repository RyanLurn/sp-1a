import { createGroq } from "@ai-sdk/groq";
import { NonEmptyStringSchema } from "@little-nebulae/zod-schemas";
import { z } from "zod";

export const GroqEnvSchema = z.object({
  GROQ_API_KEY: z.templateLiteral(["gsk_", NonEmptyStringSchema]),
});
type GroqEnv = z.infer<typeof GroqEnvSchema>;

export function createGroqProvider({
  apiKey,
}: {
  apiKey: GroqEnv["GROQ_API_KEY"];
}) {
  return createGroq({ apiKey });
}
