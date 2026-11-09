import type { ComponentProps } from "react";

import type { ChatMessage } from "@/features/chat/schemas/message";

import {
  MessageScrollerContent,
  MessageScrollerItem,
} from "@/components/ui/message-scroller";
import { ChatMessageBubble } from "@/features/chat/components/message-bubble";

interface ChatMessageThreadProps extends ComponentProps<
  typeof MessageScrollerContent
> {
  chatMessages: ChatMessage[];
}

export function ChatMessageThread({
  chatMessages,
  ...props
}: ChatMessageThreadProps) {
  return (
    <MessageScrollerContent {...props}>
      {chatMessages.map((chatMessage) => (
        <MessageScrollerItem
          key={chatMessage.id}
          scrollAnchor={chatMessage.role === "user"}
        >
          <ChatMessageBubble chatMessage={chatMessage} />
        </MessageScrollerItem>
      ))}
    </MessageScrollerContent>
  );
}
