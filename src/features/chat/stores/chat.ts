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

export function setChat({
  threadId,
  chat,
}: {
  threadId: ChatThreadId;
  chat: Chat<ChatMessage>;
}) {
  if (typeof window !== "undefined") {
    chatStore.set(threadId, chat);
  }
}

export function getEmptyChat() {
  if (typeof window !== "undefined") {
    for (const [threadId, chat] of chatStore) {
      if (chat.status === "ready" && chat.messages.length === 0) {
        return chatStore.get(threadId);
      }
    }
  }
}

export function deleteEmptyChats() {
  if (typeof window !== "undefined") {
    for (const [threadId, chat] of chatStore) {
      if (chat.status === "ready" && chat.messages.length === 0) {
        chatStore.delete(threadId);
      }
    }
  }
}
