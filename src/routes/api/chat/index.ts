import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/chat/")({
  server: {
    handlers: { POST: async () => new Response("placeholder response") },
  },
});
