import {
  composeErrorMessage,
  UNEXPECTED_ERROR_CODE,
} from "@little-nebulae/error";
import { HTTP_REQUEST_METHOD_ENUM } from "@little-nebulae/http";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import type { ChatThreadId } from "@/features/chat/types";

import { createDb, DbEnvSchema } from "@/db/create";
import { ChatThreadIdSchema } from "@/features/chat/schemas/thread";

const METHOD = HTTP_REQUEST_METHOD_ENUM.GET;

export const loadChatThread = createServerFn({ method: METHOD })
  .validator((data: { threadId: ChatThreadId }) => data)
  .handler(async ({ data }) => {
    const validateInputDataResult = z
      .object({
        threadId: ChatThreadIdSchema,
      })
      .safeParse(data);
    if (!validateInputDataResult.success) {
      const validateInputDataError = validateInputDataResult.error;
      console.error(validateInputDataError);
      return {
        code: "VALIDATION_ERROR",
        message: z.prettifyError(validateInputDataError),
        meta: z.treeifyError(validateInputDataError),
      };
    }
    const { threadId } = validateInputDataResult.data;

    const parseEnvResult = DbEnvSchema.safeParse(process.env);
    if (!parseEnvResult.success) {
      const parseEnvError = parseEnvResult.error;
      console.error(parseEnvError);
      return {
        code: UNEXPECTED_ERROR_CODE,
        message: composeErrorMessage({ operation: "load chat thread" }),
        meta: null,
      };
    }
    const env = parseEnvResult.data;

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
