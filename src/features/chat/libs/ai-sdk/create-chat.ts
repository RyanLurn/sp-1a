import { Chat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

import type { ChatMessage } from "@/features/chat/schemas/message";
import type { ChatThreadId } from "@/features/chat/types";

import { generateUuidV7 } from "@/libs/uuid";
import { Route as ChatApiRoute } from "@/routes/api/chat";

export function createChat({
  id,
  messages,
}: {
  id: ChatThreadId;
  messages: ChatMessage[];
}) {
  return new Chat({
    id,
    messages,
    generateId: generateUuidV7,
    transport: new DefaultChatTransport({
      api: ChatApiRoute.to,
    }),
  });
}
