import type { AsyncResult } from "@little-nebulae/result";
import type { ModelMessage } from "ai";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { PostgreSqlUniqueConstraintViolationError } from "@little-nebulae/postgresql";
import { fail, succeed } from "@little-nebulae/result";
import { convertToModelMessages } from "ai";

import type { Db } from "@/db/create";
import type { ChatMessage } from "@/features/chat/schemas/message";
import type { NewChatMessage } from "@/features/chat/schemas/request-body";
import type { ChatThreadId } from "@/features/chat/types";

import { chatMessageTable, chatThreadTable } from "@/db/tables/chat";

export async function prepareChatData({
  db,
  threadId,
  newMessage,
}: {
  db: Db;
  threadId: ChatThreadId;
  newMessage: NewChatMessage;
}): AsyncResult<
  { isNew: boolean; messages: ModelMessage[] },
  | PostgreSqlUniqueConstraintViolationError<
      "The returned message after insert is undefined.",
      { isNew: true } | { isNew: false; oldMessages: ChatMessage[] }
    >
  | UnexpectedError
> {
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
        .values({ ...newMessage, threadId })
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
          cause: "The returned message after insert is undefined." as const,
          meta:
            queryThreadResult === undefined
              ? { isNew: true }
              : { isNew: false, oldMessages: queryThreadResult.messages },
        }),
      );
    }

    if (queryThreadResult === undefined) {
      const messages = await convertToModelMessages<ChatMessage>([
        returnedMessage,
      ]);
      return succeed({ isNew: true, messages });
    }

    const messages = await convertToModelMessages<ChatMessage>([
      ...queryThreadResult.messages,
      returnedMessage,
    ]);
    return succeed({ isNew: false, messages });
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
