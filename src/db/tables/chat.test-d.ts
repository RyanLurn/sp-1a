import { expectTypeOf, test } from "vitest";

import type { SelectedChatMessage, SelectedChatThread } from "@/db/tables/chat";
import type { ChatMessage } from "@/features/chat/schemas/message";
import type { ChatThread } from "@/features/chat/schemas/thread";

test("chatThreadTable's inferred select type should be equal to ChatThreadSchema's inferred type", () => {
  expectTypeOf<SelectedChatThread>().toEqualTypeOf<ChatThread>();
});

test("chatMessageTable's inferred select type should be equal to ChatMessageSchema's inferred type", () => {
  expectTypeOf<SelectedChatMessage>().toEqualTypeOf<ChatMessage>();
});
