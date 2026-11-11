import { Chat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

import type { ChatMessage } from "@/features/chat/schemas/message";
import type { ChatThreadId } from "@/features/chat/types";

import { ChatRequestBodySchema } from "@/features/chat/schemas/request-body";
import { generateUuidV7 } from "@/libs/uuid";
import { Route as ChatApiRoute } from "@/routes/api/chat";

export function createChat({
  threadId,
  chatMessages,
}: {
  threadId: ChatThreadId;
  chatMessages: ChatMessage[];
}) {
  return new Chat({
    id: threadId,
    messages: chatMessages,
    generateId: generateUuidV7,
    transport: new DefaultChatTransport<ChatMessage>({
      api: ChatApiRoute.to,
      prepareSendMessagesRequest: ({ id, messages }) => {
        const body = ChatRequestBodySchema.parse({
          threadId: id,
          newMessage: messages.at(-1),
        });
        return { body };
      },
    }),
  });
}
