import { unwrap } from "@little-nebulae/result";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { createDb } from "@/db/create";
import { ChatThreadIdSchema } from "@/features/chat/schemas/thread";

const InputDataSchema = z.object({
  threadId: ChatThreadIdSchema,
});

export const loadChatThread = createServerFn()
  .validator(InputDataSchema)
  .handler(async ({ data }) => {
    const { threadId } = data;
    const db = unwrap(createDb());

    const result = await db.query.chatThreads.findFirst({
      where: { id: threadId },
      with: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });
    return result;
  });
