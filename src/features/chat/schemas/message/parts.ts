import { z } from "zod";

import { CHAT_MESSAGE_STREAM_STATE_ENUM } from "@/features/chat/constants";

const ChatMessageStreamStateSchema = z.enum(CHAT_MESSAGE_STREAM_STATE_ENUM);

export const ChatMessageTextPartSchema = z.object({
  type: z.literal("text"),
  text: z.string(),
  state: ChatMessageStreamStateSchema.exactOptional(),
});
export type ChatMessageTextPart = z.infer<typeof ChatMessageTextPartSchema>;

export const ChatMessageReasoningPartSchema = z.object({
  type: z.literal("reasoning"),
  id: z.string().exactOptional(),
  text: z.string(),
  state: ChatMessageStreamStateSchema.exactOptional(),
  providerMetadata: z.record(z.string(), z.any()).exactOptional(),
});
export type ChatMessageReasoningPart = z.infer<
  typeof ChatMessageReasoningPartSchema
>;

export const ChatMessageStepStartPartSchema = z.object({
  type: z.literal("step-start"),
});
export type ChatMessageStepStartPart = z.infer<
  typeof ChatMessageStepStartPartSchema
>;
