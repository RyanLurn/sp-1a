import { unwrap } from "@little-nebulae/result";
import { eq } from "drizzle-orm";
import { describe, expect, test } from "vitest";

import type { InsertedChatMessage, InsertedChatThread } from "@/db/tables/chat";
import type { ChatMessageId, ChatThreadId } from "@/features/chat/types";

import { createDb } from "@/db/create";
import { chatMessageTable, chatThreadTable } from "@/db/tables/chat";
import { NEW_CHAT_TITLE } from "@/features/chat/constants";
import { generateId } from "@/libs/uuid";

process.loadEnvFile();

const db = unwrap(createDb());

describe("Drizzle's batch API should", async () => {
  test("execute queries in order", async () => {
    const newThread = {
      id: generateId<ChatThreadId>(),
      title: NEW_CHAT_TITLE,
    } satisfies InsertedChatThread;
    const newMessage = {
      id: generateId<ChatMessageId>(),
      role: "user",
      parts: [{ type: "text", text: "Hi there." }],
      threadId: newThread.id,
    } satisfies InsertedChatMessage;

    const [
      firstQueryThreadResult,
      insertThreadResultList,
      insertMessageResultList,
      secondQueryThreadResult,
      deleteThreadResultList,
      thirdQueryThreadResult,
    ] = await db.batch([
      db.query.chatThreads.findFirst({
        where: { id: newThread.id },
        with: {
          messages: {
            orderBy: { createdAt: "asc" },
          },
        },
      }),
      db.insert(chatThreadTable).values({ id: newThread.id }).returning(),
      db.insert(chatMessageTable).values(newMessage).returning(),
      db.query.chatThreads.findFirst({
        where: { id: newThread.id },
        with: {
          messages: {
            orderBy: { createdAt: "asc" },
          },
        },
      }),
      db
        .delete(chatThreadTable)
        .where(eq(chatThreadTable.id, newThread.id))
        .returning(),
      db.query.chatThreads.findFirst({
        where: { id: newThread.id },
        with: {
          messages: {
            orderBy: { createdAt: "asc" },
          },
        },
      }),
    ]);

    expect(firstQueryThreadResult).toBeUndefined();
    expect(insertThreadResultList).toMatchObject([newThread]);
    expect(insertMessageResultList).toMatchObject([newMessage]);
    expect(secondQueryThreadResult).toMatchObject({
      ...newThread,
      messages: [newMessage],
    });
    expect(deleteThreadResultList).toMatchObject([newThread]);
    expect(thirdQueryThreadResult).toBeUndefined();
  });
});
