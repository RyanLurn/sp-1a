import { z } from "zod";

import type { ChatMessageId } from "@/features/chat/types";

import { CHAT_MESSAGE_ROLE_ENUM } from "@/features/chat/constants";

export const ChatMessageIdSchema = z
  .uuidv7()
  .transform((value) => value as ChatMessageId);

export const ChatMessageRoleSchema = z.enum(CHAT_MESSAGE_ROLE_ENUM);
export type ChatMessageRole = z.infer<typeof ChatMessageRoleSchema>;
