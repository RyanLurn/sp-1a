import { createFileRoute } from "@tanstack/react-router";

import {
  MessageScroller,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { ChatMessageThread } from "@/features/chat/components/message-thread";
import { ChatPromptInput } from "@/features/chat/components/prompt-input";
import { MOCK_CHAT_MESSAGES_MARKDOWN } from "@/features/chat/mock/messages/markdown";

export const Route = createFileRoute("/chat/{-$threadId}/")({
  loader: () => MOCK_CHAT_MESSAGES_MARKDOWN,
  component: RouteComponent,
});

function RouteComponent() {
  const chatMessages = Route.useLoaderData();

  return (
    <MessageScrollerProvider autoScroll>
      <MessageScroller>
        <MessageScrollerViewport>
          <div className="mx-auto flex max-w-2xl flex-col">
            <ChatMessageThread
              chatMessages={chatMessages}
              className="mt-5 flex-1"
            />
            <div className="h-20" />
            <ChatPromptInput
              sendMessage={async ({ text }) => {
                console.log(text);
              }}
              className="sticky bottom-5"
            />
          </div>
        </MessageScrollerViewport>
      </MessageScroller>
    </MessageScrollerProvider>
  );
}
