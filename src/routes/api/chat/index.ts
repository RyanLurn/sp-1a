import type { ToolSet } from "ai";

import {
  composeErrorMessage,
  UNEXPECTED_ERROR_CODE,
  UnexpectedError,
} from "@little-nebulae/error";
import { jsonParse } from "@little-nebulae/json";
import { webCreateErrorResponse } from "@little-nebulae/web-fetch";
import { createFileRoute } from "@tanstack/react-router";
import {
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from "ai";
import { z } from "zod";

import type { ChatMessage } from "@/features/chat/schemas/message";
import type { ChatMessageId } from "@/features/chat/types";

import { createDb, DbEnvSchema } from "@/db/create";
import {
  createGroqProvider,
  GroqEnvSchema,
} from "@/features/chat/libs/ai-sdk/create-groq-provider";
import { prepareChatData } from "@/features/chat/operations/prepare-chat-data";
import { saveChatMessage } from "@/features/chat/operations/save-chat-message";
import { ChatRequestBodySchema } from "@/features/chat/schemas/request-body";
import { generateId } from "@/libs/uuid";

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
            code: prepareChatDataError.code,
            message: composeErrorMessage({
              operation: "generate LLM response",
            }),
            meta: null,
            status: "INTERNAL_SERVER_ERROR",
          });
        }
        const { chatMessages, modelMessages } = prepareChatDataResult.data;

        const groqProvider = createGroqProvider({ apiKey: env.GROQ_API_KEY });
        try {
          const streamTextResult = streamText({
            model: groqProvider("openai/gpt-oss-120b"),
            messages: modelMessages,
          });

          return createUIMessageStreamResponse({
            stream: toUIMessageStream<ToolSet, ChatMessage>({
              stream: streamTextResult.stream,
              generateMessageId: generateId<ChatMessageId>,
              originalMessages: chatMessages,
              onEnd: async ({ messages }) => {
                const generatedMessage = messages.at(-1);
                if (
                  generatedMessage === undefined ||
                  generatedMessage.role !== "assistant"
                ) {
                  console.error("No assistant message was generated.");
                  return;
                }
                const saveChatMessageResult = await saveChatMessage({
                  db,
                  threadId,
                  message: messages.at(-1)!,
                });
                if (!saveChatMessageResult.success) {
                  console.error(saveChatMessageResult.error);
                }
              },
            }),
          });
        } catch (error) {
          const unexpectedError = new UnexpectedError({
            message: composeErrorMessage({
              operation: "generate LLM response",
            }),
            cause: error,
            meta: null,
          });
          console.error(unexpectedError);
          return webCreateErrorResponse({
            requestMethod: METHOD,
            code: unexpectedError.code,
            message: unexpectedError.message,
            meta: null,
            status: "INTERNAL_SERVER_ERROR",
          });
        }
      },
    },
  },
});
