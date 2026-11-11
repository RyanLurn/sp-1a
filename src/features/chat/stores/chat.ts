import type { Chat } from "@ai-sdk/react";

import type { ChatMessage } from "@/features/chat/schemas/message";
import type { ChatThreadId } from "@/features/chat/types";

const chatStore = new Map<ChatThreadId, Chat<ChatMessage>>();

export function getChat({ threadId }: { threadId: ChatThreadId }) {
  if (typeof window === "undefined") {
    return undefined;
  }
  return chatStore.get(threadId);
}
