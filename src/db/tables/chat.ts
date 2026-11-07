import { pgTable, text } from "drizzle-orm/pg-core";

import type { ChatThreadId } from "@/features/chat/types";

import { id } from "@/db/helpers/id";
import { timestamps } from "@/db/helpers/timestamps";
import { NEW_CHAT_TITLE } from "@/features/chat/constants";

export const chatThreadTable = pgTable("chat_threads", {
  id: id.$type<ChatThreadId>(),
  title: text("title").notNull().default(NEW_CHAT_TITLE),
  ...timestamps,
});
export type SelectedChatThread = typeof chatThreadTable.$inferSelect;
export type InsertedChatThread = typeof chatThreadTable.$inferInsert;
