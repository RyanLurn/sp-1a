import { unwrap } from "@little-nebulae/result";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { createDb } from "@/db/create";
import { ChatThreadIdSchema } from "@/features/chat/schemas/thread";

const InputDataSchema = z.object({
  threadId: ChatThreadIdSchema,
});

export const loadChatMessages = createServerFn()
  .validator(InputDataSchema)
  .handler(async ({ data }) => {
    const { threadId } = data;
    const db = unwrap(createDb());

    const chatMessages = await db.query.chatMessages.findMany({
      where: { threadId },
      orderBy: { createdAt: "asc" },
    });
    return chatMessages;
  });
