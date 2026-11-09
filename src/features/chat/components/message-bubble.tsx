import type { ComponentProps } from "react";
import type { Except } from "type-fest";

import type { ChatMessage } from "@/features/chat/schemas/message";

import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Message, MessageContent } from "@/components/ui/message";

interface ChatMessageBubbleProps extends Except<
  ComponentProps<typeof Message>,
  "align"
> {
  chatMessage: ChatMessage;
}

export function ChatMessageBubble({
  chatMessage,
  ...props
}: ChatMessageBubbleProps) {
  if (chatMessage.role === "user") {
    return (
      <Message align="end" {...props}>
        <MessageContent>
          {chatMessage.parts.map((part) => {
            if (part.type === "text") {
              return (
                <Bubble key={part.type} align="end" variant="secondary">
                  <BubbleContent>{part.text}</BubbleContent>
                </Bubble>
              );
            }
          })}
        </MessageContent>
      </Message>
    );
  }

  return (
    <Message>
      <MessageContent>
        {chatMessage.parts.map((part) => {
          if (part.type === "text") {
            return (
              <Bubble key={part.type} variant="ghost">
                <BubbleContent>{part.text}</BubbleContent>
              </Bubble>
            );
          }
        })}
      </MessageContent>
    </Message>
  );
}
