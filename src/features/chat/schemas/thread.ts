import { NonEmptyStringSchema } from "@little-nebulae/zod-schemas";
import { z } from "zod";

import type { ChatThreadId } from "@/features/chat/types";

export const ChatThreadIdSchema = z
  .uuidv7()
  .transform((value) => value as ChatThreadId);

export const ChatThreadSchema = z.object({
  id: ChatThreadIdSchema,
  title: NonEmptyStringSchema,
});
