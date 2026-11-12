import { jsonParse } from "@little-nebulae/json";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/chat/")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const text = await request.text();

        const jsonParseResult = jsonParse(text);
        if (!jsonParseResult.success) {
          return new Response(null, { status: 400, statusText: "Bad Request" });
        }
        const json = jsonParseResult.data;
      },
    },
  },
});
