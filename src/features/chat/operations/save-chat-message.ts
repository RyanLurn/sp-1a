import type { Except } from "type-fest";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { attemptAsync } from "@little-nebulae/result";
import { createServerOnlyFn } from "@tanstack/react-start";

import type { Db } from "@/db/create";
import type { InsertedChatMessage } from "@/db/tables/chat";
import type { ChatThreadId } from "@/features/chat/types";

import { chatMessageTable } from "@/db/tables/chat";

export const saveChatMessage = createServerOnlyFn(
  async ({
    db,
    threadId,
    message,
  }: {
    db: Db;
    threadId: ChatThreadId;
    message: Except<InsertedChatMessage, "threadId">;
  }) =>
    attemptAsync({
      tryFn: () => db.insert(chatMessageTable).values({ ...message, threadId }),
      catchFn: (error) =>
        new UnexpectedError({
          message: composeErrorMessage({ operation: "save chat message" }),
          cause: error,
          meta: null,
        }),
    }),
);
