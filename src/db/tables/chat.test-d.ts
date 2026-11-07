import { expectTypeOf, test } from "vitest";

import type { SelectedChatThread } from "@/db/tables/chat";
import type { ChatThread } from "@/features/chat/schemas/thread";

test("chatThreadTable's inferred select type should be equal to ChatThreadSchema's inferred type", () => {
  expectTypeOf<SelectedChatThread>().toEqualTypeOf<ChatThread>();
});
