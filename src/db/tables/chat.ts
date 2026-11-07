import { index, jsonb, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";

import type { ChatMessageParts } from "@/features/chat/schemas/message/parts";
import type { ChatMessageId, ChatThreadId } from "@/features/chat/types";

import { id } from "@/db/helpers/id";
import { timestamps } from "@/db/helpers/timestamps";
import {
  CHAT_MESSAGE_ROLE_ENUM,
  NEW_CHAT_TITLE,
} from "@/features/chat/constants";

export const chatThreadTable = pgTable("chat_threads", {
  id: id.$type<ChatThreadId>(),
  title: text("title").notNull().default(NEW_CHAT_TITLE),
  ...timestamps,
});
export type SelectedChatThread = typeof chatThreadTable.$inferSelect;
export type InsertedChatThread = typeof chatThreadTable.$inferInsert;

export const chatMessageRoleEnum = pgEnum(
  "chat_message_role",
  CHAT_MESSAGE_ROLE_ENUM,
);
export const chatMessageTable = pgTable(
  "chat_messages",
  {
    id: id.$type<ChatMessageId>(),
    role: chatMessageRoleEnum().notNull(),
    parts: jsonb("parts").notNull().$type<ChatMessageParts>(),
    threadId: uuid("thread_id")
      .notNull()
      .references(() => chatThreadTable.id, { onDelete: "cascade" })
      .$type<ChatThreadId>(),
    ...timestamps,
  },
  (table) => [index("thread_id_index").on(table.threadId)],
);
export type SelectedChatMessage = typeof chatMessageTable.$inferSelect;
export type InsertedChatMessage = typeof chatMessageTable.$inferInsert;
