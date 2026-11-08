import type { ChatThread } from "@/features/chat/schemas/thread";
import type { ChatThreadId } from "@/features/chat/types";

export const mockChatThreads: ChatThread[] = [
  {
    id: "thr_01HZX3K9A1" as ChatThreadId,
    title: "Debugging a React useEffect loop",
    createdAt: new Date("2026-11-08T09:12:00Z"),
    updatedAt: new Date("2026-11-08T09:48:00Z"),
  },
  {
    id: "thr_01HZX3K9B2" as ChatThreadId,
    title: "Plan a 5-day trip to Da Nang",
    createdAt: new Date("2026-11-07T14:03:00Z"),
    updatedAt: new Date("2026-11-07T14:40:00Z"),
  },
  {
    id: "thr_01HZX3K9C3" as ChatThreadId,
    title: "Explain TypeScript branded types",
    createdAt: new Date("2026-11-06T08:30:00Z"),
    updatedAt: new Date("2026-11-06T09:05:00Z"),
  },
  {
    id: "thr_01HZX3K9D4" as ChatThreadId,
    title: "Draft an email to my landlord",
    createdAt: new Date("2026-11-05T17:22:00Z"),
    updatedAt: new Date("2026-11-05T17:31:00Z"),
  },
  {
    id: "thr_01HZX3K9E5" as ChatThreadId,
    title: "Weekly meal prep ideas (high protein)",
    createdAt: new Date("2026-11-04T11:00:00Z"),
    updatedAt: new Date("2026-11-04T11:52:00Z"),
  },
  {
    id: "thr_01HZX3K9F6" as ChatThreadId,
    title: "SQL query: top customers by revenue",
    createdAt: new Date("2026-11-03T13:45:00Z"),
    updatedAt: new Date("2026-11-03T14:20:00Z"),
  },
  {
    id: "thr_01HZX3K9G7" as ChatThreadId,
    title: "Summarize this research paper on RAG",
    createdAt: new Date("2026-11-01T10:10:00Z"),
    updatedAt: new Date("2026-11-02T08:15:00Z"),
  },
  {
    id: "thr_01HZX3K9H8" as ChatThreadId,
    title:
      "A very long thread title that should definitely get truncated in the sidebar UI",
    createdAt: new Date("2026-10-28T19:05:00Z"),
    updatedAt: new Date("2026-10-30T20:44:00Z"),
  },
  {
    id: "thr_01HZX3K9J9" as ChatThreadId,
    title: "Brainstorm names for a side project",
    createdAt: new Date("2026-10-20T07:55:00Z"),
    updatedAt: new Date("2026-10-20T08:20:00Z"),
  },
  {
    id: "thr_01HZX3K9KA" as ChatThreadId,
    title: "Untitled chat",
    createdAt: new Date("2026-10-02T22:18:00Z"),
    updatedAt: new Date("2026-10-02T22:18:00Z"),
  },
];
