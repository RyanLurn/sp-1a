import { z } from "zod";

import { CHAT_MESSAGE_ROLE_ENUM } from "@/features/chat/constants";
import { ChatMessageSchema } from "@/features/chat/schemas/message";
import { ChatThreadIdSchema } from "@/features/chat/schemas/thread";

export const ChatRequestBodySchema = z.object({
  threadId: ChatThreadIdSchema,
  newMessage: z.object({
    ...ChatMessageSchema.omit({
      threadId: true,
      createdAt: true,
      updatedAt: true,
    }).shape,
    role: z.literal(CHAT_MESSAGE_ROLE_ENUM.USER),
  }),
});
export type ChatRequestBody = z.infer<typeof ChatRequestBodySchema>;
