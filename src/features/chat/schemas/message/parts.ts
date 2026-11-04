import { z } from "zod";

import { CHAT_MESSAGE_STREAM_STATE_ENUM } from "@/features/chat/constants";

const ChatMessageStreamStateSchema = z.enum(CHAT_MESSAGE_STREAM_STATE_ENUM);

export const ChatMessageTextPartSchema = z.object({
  type: z.literal("text"),
  text: z.string(),
  state: ChatMessageStreamStateSchema.exactOptional(),
});
export type ChatMessageTextPart = z.infer<typeof ChatMessageTextPartSchema>;
