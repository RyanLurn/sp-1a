import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { PostgreSqlUniqueConstraintViolationError } from "@little-nebulae/postgresql";
import { fail, succeed } from "@little-nebulae/result";

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
  try {
    const [queryThreadResult, _, [returnedMessage]] = await db.batch([
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
      db
        .insert(chatMessageTable)
        .values(newMessage)
        .onConflictDoNothing({ target: chatMessageTable.id })
        .returning(),
    ]);

    if (returnedMessage === undefined) {
      return fail(
        new PostgreSqlUniqueConstraintViolationError({
          message: composeErrorMessage({
            operation: "insert new message",
            reason: "duplicate id",
          }),
          cause: "The returned message after insert is undefined.",
          meta:
            queryThreadResult === undefined
              ? { isNew: true }
              : { isNew: false, oldMessages: queryThreadResult.messages },
        }),
      );
    }

    if (queryThreadResult === undefined) {
      return succeed({ isNew: true, messages: [newMessage] });
    }
    return succeed({
      isNew: false,
      messages: [...queryThreadResult.messages, newMessage],
    });
  } catch (error) {
    return fail(
      new UnexpectedError({
        message: composeErrorMessage({ operation: "prepare chat data" }),
        cause: error,
        meta: null,
      }),
    );
  }
}
