import { useChat } from "@ai-sdk/react";
import { createFileRoute } from "@tanstack/react-router";

import type { ChatMessage } from "@/features/chat/schemas/message";
import type { ChatThreadId } from "@/features/chat/types";

import {
  MessageScroller,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { ChatMessageThread } from "@/features/chat/components/message-thread";
import { ChatPromptInput } from "@/features/chat/components/prompt-input";
import { createChat } from "@/features/chat/libs/ai-sdk/create-chat";
import { loadChatThread } from "@/features/chat/operations/load-chat-thread";
import { ChatThreadIdSchema } from "@/features/chat/schemas/thread";
import { getChat } from "@/features/chat/stores/chat";
import { generateId } from "@/libs/uuid";

export const Route = createFileRoute("/chat/{-$threadId}/")({
  loader: async ({ params }) => {
    if (params.threadId === undefined) {
      const threadId = generateId<ChatThreadId>();
      const newChat = createChat({
        threadId,
        chatMessages: [],
      });
      return { chat: newChat };
    }

    const threadId = ChatThreadIdSchema.parse(params.threadId);
    const clientChat = getChat({ threadId });
    if (clientChat) {
      return { chat: clientChat };
    }

    const chatThread = await loadChatThread({ data: { threadId } });
    if (chatThread === undefined) {
      throw new Error("404 - Thread not found");
    }
    const serverChat = createChat({
      threadId: chatThread.id,
      chatMessages: chatThread.messages,
    });
    return { chat: serverChat };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { chat } = Route.useLoaderData();
  const { messages, sendMessage } = useChat<ChatMessage>({ chat });

  return (
    <MessageScrollerProvider autoScroll>
      <MessageScroller>
        <MessageScrollerViewport>
          <div className="mx-auto flex max-w-2xl flex-col">
            <ChatMessageThread
              chatMessages={messages}
              className="mt-5 flex-1"
            />
            <div className="h-20" />
            <ChatPromptInput
              sendMessage={sendMessage}
              className="sticky bottom-5"
            />
          </div>
        </MessageScrollerViewport>
      </MessageScroller>
    </MessageScrollerProvider>
  );
}
