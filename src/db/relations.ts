import { defineRelations } from "drizzle-orm";

import { chatMessageTable, chatThreadTable } from "@/db/tables/chat";

export const relations = defineRelations(
  { chatThreads: chatThreadTable, chatMessages: chatMessageTable },
  ({ many, one, chatThreads, chatMessages }) => ({
    chatThreads: {
      messages: many.chatMessages({
        from: chatThreads.id,
        to: chatMessages.threadId,
      }),
    },
    chatMessages: {
      thread: one.chatThreads({
        from: chatMessages.threadId,
        to: chatThreads.id,
      }),
    },
  }),
);
