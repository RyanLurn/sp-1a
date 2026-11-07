export const NEW_CHAT_TITLE = "New chat";

export const CHAT_MESSAGE_ROLE_ENUM = {
  SYSTEM: "system",
  USER: "user",
  ASSISTANT: "assistant",
} as const;

export const CHAT_MESSAGE_STREAM_STATE_ENUM = {
  STREAMING: "streaming",
  DONE: "done",
} as const;
