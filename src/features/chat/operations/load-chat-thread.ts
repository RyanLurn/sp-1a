import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { createDb, DbEnvSchema } from "@/db/create";
import { ChatThreadIdSchema } from "@/features/chat/schemas/thread";

const InputDataSchema = z.object({
  threadId: ChatThreadIdSchema,
});

export const loadChatThread = createServerFn()
  .validator(InputDataSchema)
  .handler(async ({ data }) => {
    const { threadId } = data;

    const env = DbEnvSchema.parse(process.env);
    const db = createDb({
      connectionString: env.NEON_POOLED_CONNECTION_STRING,
    });

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
