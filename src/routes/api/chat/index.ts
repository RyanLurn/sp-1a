import {
  composeErrorMessage,
  UNEXPECTED_ERROR_CODE,
} from "@little-nebulae/error";
import { jsonParse } from "@little-nebulae/json";
import { webCreateErrorResponse } from "@little-nebulae/web-fetch";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { createDb, DbEnvSchema } from "@/db/create";
import { GroqEnvSchema } from "@/features/chat/libs/ai-sdk/create-groq-provider";
import { prepareChatData } from "@/features/chat/operations/prepare-chat-data";
import { ChatRequestBodySchema } from "@/features/chat/schemas/request-body";

const METHOD = "POST";

export const Route = createFileRoute("/api/chat/")({
  server: {
    handlers: {
      [METHOD]: async ({ request }) => {
        const text = await request.text();

        const jsonParseResult = jsonParse({ text });
        if (!jsonParseResult.success) {
          const jsonParseError = jsonParseResult.error;
          console.error(jsonParseError);
          return webCreateErrorResponse({
            requestMethod: METHOD,
            code: jsonParseError.code,
            message: jsonParseError.message,
            meta: null,
            status: "BAD_REQUEST",
          });
        }
        const json = jsonParseResult.data;

        const validateRequestBodyResult = ChatRequestBodySchema.safeParse(json);
        if (!validateRequestBodyResult.success) {
          const validateRequestBodyError = validateRequestBodyResult.error;
          console.error(validateRequestBodyError);
          return webCreateErrorResponse({
            requestMethod: METHOD,
            code: "VALIDATION_ERROR",
            message: validateRequestBodyError.message,
            meta: z.treeifyError(validateRequestBodyError),
            status: "UNPROCESSABLE_CONTENT",
          });
        }
        const { threadId, newMessage } = validateRequestBodyResult.data;

        const parseEnvResult = z
          .object({
            ...DbEnvSchema.shape,
            ...GroqEnvSchema.shape,
          })
          .safeParse(process.env, { reportInput: false });
        if (!parseEnvResult.success) {
          const parseEnvError = parseEnvResult.error;
          console.error(parseEnvError);
          return webCreateErrorResponse({
            requestMethod: METHOD,
            code: UNEXPECTED_ERROR_CODE,
            message: composeErrorMessage({
              operation: "generate LLM response",
            }),
            meta: null,
            status: "INTERNAL_SERVER_ERROR",
          });
        }
        const env = parseEnvResult.data;

        const db = createDb({
          connectionString: env.NEON_POOLED_CONNECTION_STRING,
        });

        const prepareChatDataResult = await prepareChatData({
          db,
          threadId,
          newMessage,
        });
        if (!prepareChatDataResult.success) {
          const prepareChatDataError = prepareChatDataResult.error;
          console.error(prepareChatDataError);
          if (
            prepareChatDataError.code ===
            "POSTGRESQL_UNIQUE_CONSTRAINT_VIOLATION_ERROR"
          ) {
            return webCreateErrorResponse({
              requestMethod: METHOD,
              code: "RESOURCE_ALREADY_EXISTS_ERROR",
              message: "The id of new message already exists.",
              meta: null,
              status: "CONFLICT",
            });
          }
          return webCreateErrorResponse({
            requestMethod: METHOD,
            code: UNEXPECTED_ERROR_CODE,
            message: composeErrorMessage({
              operation: "generate LLM response",
            }),
            meta: null,
            status: "INTERNAL_SERVER_ERROR",
          });
        }
        const { isNew, messages } = prepareChatDataResult.data;
      },
    },
  },
});
