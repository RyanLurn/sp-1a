import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { attemptAsync } from "@little-nebulae/result";

import type { Db } from "@/db/create";
import type { InsertedChatMessage } from "@/db/tables/chat";
import type { ChatThreadId } from "@/features/chat/types";

import { chatMessageTable, chatThreadTable } from "@/db/tables/chat";

export async function prepareChatData({
  db,
  threadId,
  newMessage,
}: {
  db: Db;
  threadId: ChatThreadId;
  newMessage: InsertedChatMessage;
}) {
  return attemptAsync({
    tryFn: () =>
      db.batch([
        db.query.chatThreads.findFirst({
          where: { id: threadId },
          with: {
            messages: {
              orderBy: { createdAt: "asc" },
            },
          },
        }),
        db
          .insert(chatThreadTable)
          .values({ id: threadId })
          .onConflictDoNothing({ target: chatThreadTable.id }),
        db.insert(chatMessageTable).values(newMessage).onConflictDoNothing(),
      ]),
    catchFn: (error) =>
      new UnexpectedError({
        message: composeErrorMessage({ operation: "prepare chat data" }),
        cause: error,
        meta: null,
      }),
  });
}
