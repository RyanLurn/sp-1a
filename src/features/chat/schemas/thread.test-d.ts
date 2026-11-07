import { expectTypeOf, test } from "vitest";

import type { SelectedChatThread } from "@/db/tables/chat";
import type { ChatThread } from "@/features/chat/schemas/thread";

test("ChatThreadSchema's inferred type should be equal to chatThreadTable's inferred select type", () => {
  expectTypeOf<ChatThread>().toEqualTypeOf<SelectedChatThread>();
});
