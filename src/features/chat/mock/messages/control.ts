import type { ChatMessage } from "@/features/chat/schemas/message";
import type { ChatMessageId, ChatThreadId } from "@/features/chat/types";

import {
  CHAT_MESSAGE_ROLE_ENUM,
  CHAT_MESSAGE_STREAM_STATE_ENUM,
} from "@/features/chat/constants";

export const MOCK_THREAD_ID =
  "01a1bf89-16f8-7027-99fd-dcf7196e460a" as ChatThreadId;

/**
 * Control set: short, casual, plain-text messages (no markdown, no reasoning).
 * User messages have no `state` (they never stream); assistant messages are
 * prefixed with a `step-start` part and marked `done`, as if they had streamed.
 */
export const MOCK_CHAT_MESSAGES_CONTROL: ChatMessage[] = [
  {
    id: "01a1bf89-2a80-7fdc-9cf0-97df93d01437" as ChatMessageId,
    role: CHAT_MESSAGE_ROLE_ENUM.USER,
    parts: [{ type: "text", text: "hey, you around?" }],
    threadId: MOCK_THREAD_ID,
    createdAt: new Date("2026-11-09T09:00:00.000Z"),
    updatedAt: new Date("2026-11-09T09:00:00.000Z"),
  },
  {
    id: "01a1bf89-3a20-7ba0-bf85-afde8e857191" as ChatMessageId,
    role: CHAT_MESSAGE_ROLE_ENUM.ASSISTANT,
    parts: [
      { type: "step-start" },
      {
        type: "text",
        text: "yep, what's up?",
        state: CHAT_MESSAGE_STREAM_STATE_ENUM.DONE,
      },
    ],
    threadId: MOCK_THREAD_ID,
    createdAt: new Date("2026-11-09T09:00:04.000Z"),
    updatedAt: new Date("2026-11-09T09:00:05.000Z"),
  },
  {
    id: "01a1bf89-c2d8-7f25-bc36-30697178daa3" as ChatMessageId,
    role: CHAT_MESSAGE_ROLE_ENUM.USER,
    parts: [
      {
        type: "text",
        text: "trying to decide what to eat for dinner and my brain is empty",
      },
    ],
    threadId: MOCK_THREAD_ID,
    createdAt: new Date("2026-11-09T09:00:39.000Z"),
    updatedAt: new Date("2026-11-09T09:00:39.000Z"),
  },
  {
    id: "01a1bf89-d660-7fdd-8589-c6a562b771d6" as ChatMessageId,
    role: CHAT_MESSAGE_ROLE_ENUM.ASSISTANT,
    parts: [
      { type: "step-start" },
      {
        type: "text",
        text: "ha, classic. what are you in the mood for, something light or something heavy?",
        state: CHAT_MESSAGE_STREAM_STATE_ENUM.DONE,
      },
    ],
    threadId: MOCK_THREAD_ID,
    createdAt: new Date("2026-11-09T09:00:44.000Z"),
    updatedAt: new Date("2026-11-09T09:00:46.000Z"),
  },
  {
    id: "01a1bf8a-43c0-72de-ba56-164964ba2a37" as ChatMessageId,
    role: CHAT_MESSAGE_ROLE_ENUM.USER,
    parts: [{ type: "text", text: "heavy. it's been a long day" }],
    threadId: MOCK_THREAD_ID,
    createdAt: new Date("2026-11-09T09:01:12.000Z"),
    updatedAt: new Date("2026-11-09T09:01:12.000Z"),
  },
  {
    id: "01a1bf8a-5360-757f-91c5-ef7e9f1bcc5f" as ChatMessageId,
    role: CHAT_MESSAGE_ROLE_ENUM.ASSISTANT,
    parts: [
      { type: "step-start" },
      {
        type: "text",
        text: "ooh okay. pizza, burgers, or a big bowl of noodles?",
        state: CHAT_MESSAGE_STREAM_STATE_ENUM.DONE,
      },
    ],
    threadId: MOCK_THREAD_ID,
    createdAt: new Date("2026-11-09T09:01:16.000Z"),
    updatedAt: new Date("2026-11-09T09:01:18.000Z"),
  },
  {
    id: "01a1bf8a-a950-77a2-80c9-b78c239889ff" as ChatMessageId,
    role: CHAT_MESSAGE_ROLE_ENUM.USER,
    parts: [{ type: "text", text: "noodles sound good actually" }],
    threadId: MOCK_THREAD_ID,
    createdAt: new Date("2026-11-09T09:01:38.000Z"),
    updatedAt: new Date("2026-11-09T09:01:38.000Z"),
  },
  {
    id: "01a1bf8a-b8f0-754b-a794-060295b95ce2" as ChatMessageId,
    role: CHAT_MESSAGE_ROLE_ENUM.ASSISTANT,
    parts: [
      { type: "step-start" },
      {
        type: "text",
        text: "good call. ramen, pho, or something spicy like dan dan noodles?",
        state: CHAT_MESSAGE_STREAM_STATE_ENUM.DONE,
      },
    ],
    threadId: MOCK_THREAD_ID,
    createdAt: new Date("2026-11-09T09:01:42.000Z"),
    updatedAt: new Date("2026-11-09T09:01:44.000Z"),
  },
  {
    id: "01a1bf8b-3208-7e32-b8ee-c8ae2613b0d0" as ChatMessageId,
    role: CHAT_MESSAGE_ROLE_ENUM.USER,
    parts: [{ type: "text", text: "pho. it's raining here so it feels right" }],
    threadId: MOCK_THREAD_ID,
    createdAt: new Date("2026-11-09T09:02:13.000Z"),
    updatedAt: new Date("2026-11-09T09:02:13.000Z"),
  },
  {
    id: "01a1bf8b-4590-740b-afcb-9035816606d3" as ChatMessageId,
    role: CHAT_MESSAGE_ROLE_ENUM.ASSISTANT,
    parts: [
      { type: "step-start" },
      {
        type: "text",
        text: "perfect pairing honestly. hot soup on a rainy day is hard to beat",
        state: CHAT_MESSAGE_STREAM_STATE_ENUM.DONE,
      },
    ],
    threadId: MOCK_THREAD_ID,
    createdAt: new Date("2026-11-09T09:02:18.000Z"),
    updatedAt: new Date("2026-11-09T09:02:20.000Z"),
  },
  {
    id: "01a1bf8b-e1d0-7d0b-a5d7-47dba0af6a5c" as ChatMessageId,
    role: CHAT_MESSAGE_ROLE_ENUM.USER,
    parts: [
      {
        type: "text",
        text: "lol true. do i get the rare beef or just go with the usual?",
      },
    ],
    threadId: MOCK_THREAD_ID,
    createdAt: new Date("2026-11-09T09:02:58.000Z"),
    updatedAt: new Date("2026-11-09T09:02:58.000Z"),
  },
  {
    id: "01a1bf8b-f558-7b5f-bf0b-54e9e69d4cfa" as ChatMessageId,
    role: CHAT_MESSAGE_ROLE_ENUM.ASSISTANT,
    parts: [
      { type: "step-start" },
      {
        type: "text",
        text: "get the rare beef. it cooks in the broth anyway, so you get a bit of both",
        state: CHAT_MESSAGE_STREAM_STATE_ENUM.DONE,
      },
    ],
    threadId: MOCK_THREAD_ID,
    createdAt: new Date("2026-11-09T09:03:03.000Z"),
    updatedAt: new Date("2026-11-09T09:03:06.000Z"),
  },
  {
    id: "01a1bf8c-3ba8-79c0-97cd-6c887afe675c" as ChatMessageId,
    role: CHAT_MESSAGE_ROLE_ENUM.USER,
    parts: [{ type: "text", text: "ok sold. ordering now" }],
    threadId: MOCK_THREAD_ID,
    createdAt: new Date("2026-11-09T09:03:21.000Z"),
    updatedAt: new Date("2026-11-09T09:03:21.000Z"),
  },
  {
    id: "01a1bf8c-4760-7c90-869f-33a742dac64c" as ChatMessageId,
    role: CHAT_MESSAGE_ROLE_ENUM.ASSISTANT,
    parts: [
      { type: "step-start" },
      {
        type: "text",
        text: "nice, enjoy! tell me how it was",
        state: CHAT_MESSAGE_STREAM_STATE_ENUM.DONE,
      },
    ],
    threadId: MOCK_THREAD_ID,
    createdAt: new Date("2026-11-09T09:03:24.000Z"),
    updatedAt: new Date("2026-11-09T09:03:25.000Z"),
  },
];
