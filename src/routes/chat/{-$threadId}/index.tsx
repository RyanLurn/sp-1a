import { useChat } from "@ai-sdk/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

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
import { getChat, getEmptyChat, setChat } from "@/features/chat/stores/chat";
import { generateId } from "@/libs/uuid";

export const Route = createFileRoute("/chat/{-$threadId}/")({
  loader: async ({ params }) => {
    if (params.threadId === undefined) {
      const emptyChat = getEmptyChat();
      if (emptyChat) {
        return { chat: emptyChat };
      }

      const threadId = generateId<ChatThreadId>();
      const newChat = createChat({
        threadId,
        chatMessages: [],
      });
      setChat({ threadId, chat: newChat });
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
  const navigate = useNavigate();
  const { threadId } = Route.useParams();
  const { chat } = Route.useLoaderData();
  const { messages, sendMessage } = useChat<ChatMessage>({ chat });

  async function sendPrompt({ text }: { text: string }) {
    await sendMessage({ text });
    if (threadId === undefined) {
      await navigate({
        to: "/chat/{-$threadId}",
        params: { threadId: chat.id },
        replace: true,
      });
    }
  }

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
              sendPrompt={sendPrompt}
              className="sticky bottom-5"
            />
          </div>
        </MessageScrollerViewport>
      </MessageScroller>
    </MessageScrollerProvider>
  );
}
