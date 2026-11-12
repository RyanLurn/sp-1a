import { HTTP_ERROR_RESPONSE_STATUS_ENUM } from "@little-nebulae/http";
import { jsonParse } from "@little-nebulae/json";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/chat/")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const text = await request.text();

        const jsonParseResult = jsonParse(text);
        if (!jsonParseResult.success) {
          console.error(jsonParseResult.error);
          const httpStatus = HTTP_ERROR_RESPONSE_STATUS_ENUM.BAD_REQUEST;
          return new Response(null, {
            status: httpStatus.code,
            statusText: httpStatus.text,
          });
        }
        const json = jsonParseResult.data;
      },
    },
  },
});
