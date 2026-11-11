import { z } from "zod";

import { ChatMessageSchema } from "@/features/chat/schemas/message";
import { ChatThreadIdSchema } from "@/features/chat/schemas/thread";

export const ChatRequestBodySchema = z.object({
  threadId: ChatThreadIdSchema,
  newMessage: ChatMessageSchema.omit({
    threadId: true,
    createdAt: true,
    updatedAt: true,
  }),
});
export type ChatRequestBody = z.infer<typeof ChatRequestBodySchema>;
