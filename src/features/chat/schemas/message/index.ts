import { z } from "zod";

import type { ChatMessageId } from "@/features/chat/types";

import { CHAT_MESSAGE_ROLE_ENUM } from "@/features/chat/constants";
import { ChatMessagePartsSchema } from "@/features/chat/schemas/message/parts";
import { ChatThreadIdSchema } from "@/features/chat/schemas/thread";
import { TimestampsSchema } from "@/utils/schemas";

export const ChatMessageIdSchema = z
  .uuidv7()
  .transform((value) => value as ChatMessageId);

export const ChatMessageRoleSchema = z.enum(CHAT_MESSAGE_ROLE_ENUM);
export type ChatMessageRole = z.infer<typeof ChatMessageRoleSchema>;

export const ChatMessageSchema = z.object({
  id: ChatMessageIdSchema,
  role: ChatMessageRoleSchema,
  parts: ChatMessagePartsSchema,
  threadId: ChatThreadIdSchema,
  ...TimestampsSchema.shape,
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export const NewChatMessageSchema = ChatMessageSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type NewChatMessage = z.infer<typeof NewChatMessageSchema>;
