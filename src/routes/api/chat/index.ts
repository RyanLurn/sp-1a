import { composeErrorMessage } from "@little-nebulae/error";
import { HTTP_ERROR_RESPONSE_STATUS_ENUM } from "@little-nebulae/http";
import { jsonParse } from "@little-nebulae/json";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { createDb, DbEnvSchema } from "@/db/create";
import { GroqEnvSchema } from "@/features/chat/libs/ai-sdk/create-groq-provider";
import { prepareChatData } from "@/features/chat/operations/prepare-chat-data";
import { ChatRequestBodySchema } from "@/features/chat/schemas/request-body";

export const Route = createFileRoute("/api/chat/")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const text = await request.text();

        const jsonParseResult = jsonParse(text);
        if (!jsonParseResult.success) {
          console.error(jsonParseResult.error);
          const httpStatus = HTTP_ERROR_RESPONSE_STATUS_ENUM.BAD_REQUEST;
          return new Response(jsonParseResult.error.message, {
            status: httpStatus.code,
            statusText: httpStatus.text,
          });
        }
        const json = jsonParseResult.data;

        const zodParseResult = ChatRequestBodySchema.safeParse(json);
        if (!zodParseResult.success) {
          console.error(zodParseResult.error);
          const httpStatus = HTTP_ERROR_RESPONSE_STATUS_ENUM.BAD_REQUEST;
          return new Response(z.prettifyError(zodParseResult.error), {
            status: httpStatus.code,
            statusText: httpStatus.text,
          });
        }
        const { threadId, newMessage } = zodParseResult.data;

        const parseEnvResult = z
          .object({
            ...DbEnvSchema.shape,
            ...GroqEnvSchema.shape,
          })
          .safeParse(process.env, { reportInput: false });
        if (!parseEnvResult.success) {
          console.error(parseEnvResult.error);
          const httpStatus =
            HTTP_ERROR_RESPONSE_STATUS_ENUM.INTERNAL_SERVER_ERROR;
          return new Response(
            composeErrorMessage({ operation: "generate LLM response" }),
            {
              status: httpStatus.code,
              statusText: httpStatus.text,
            },
          );
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
            const httpStatus = HTTP_ERROR_RESPONSE_STATUS_ENUM.CONFLICT;
            return new Response("The new message's id already exists.", {
              status: httpStatus.code,
              statusText: httpStatus.text,
            });
          }
          const httpStatus =
            HTTP_ERROR_RESPONSE_STATUS_ENUM.INTERNAL_SERVER_ERROR;
          return new Response(
            composeErrorMessage({ operation: "generate LLM response" }),
            {
              status: httpStatus.code,
              statusText: httpStatus.text,
            },
          );
        }
        const { isNew, messages } = prepareChatDataResult.data;
      },
    },
  },
});
