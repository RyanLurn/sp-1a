import type { Chat } from "@ai-sdk/react";

import type { ChatMessage } from "@/features/chat/schemas/message";
import type { ChatThreadId } from "@/features/chat/types";

export const chats = new Map<ChatThreadId, Chat<ChatMessage>>();
