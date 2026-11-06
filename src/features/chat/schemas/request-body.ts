import { z } from "zod";

import { NewChatMessageSchema } from "@/features/chat/schemas/message";

export const ChatRequestBodySchema = z.object({
  newMessage: NewChatMessageSchema,
});
export type ChatRequestBody = z.infer<typeof ChatRequestBodySchema>;
