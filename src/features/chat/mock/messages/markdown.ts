import type { ChatMessage } from "@/features/chat/schemas/message";
import type { ChatMessageId, ChatThreadId } from "@/features/chat/types";

import {
  CHAT_MESSAGE_ROLE_ENUM,
  CHAT_MESSAGE_STREAM_STATE_ENUM,
} from "@/features/chat/constants";

export const MOCK_MARKDOWN_THREAD_ID =
  "01a1c09b-bf78-709e-b5d7-bd1969327947" as ChatThreadId;

/**
 * Markdown set: CommonMark only (no GFM, no code fences).
 * Covers headings (h1-h3), emphasis, strong, ordered/unordered/nested lists,
 * blockquotes, thematic breaks, inline code, inline + reference links,
 * angle-bracket autolinks, and a backslash hard line break.
 * User messages are plain text, as they would be in a real chat.
 */
export const MOCK_CHAT_MESSAGES_MARKDOWN: ChatMessage[] = [
  {
    id: "01a1c09b-d300-7219-b48c-622efc91ff10" as ChatMessageId,
    role: CHAT_MESSAGE_ROLE_ENUM.USER,
    parts: [
      {
        type: "text",
        text: "I want to start baking sourdough but I have no idea where to begin. Can you help?",
      },
    ],
    threadId: MOCK_MARKDOWN_THREAD_ID,
    createdAt: new Date("2026-11-09T14:00:00.000Z"),
    updatedAt: new Date("2026-11-09T14:00:00.000Z"),
  },
  {
    id: "01a1c09b-ea70-70a0-bd46-9bc2562885dd" as ChatMessageId,
    role: CHAT_MESSAGE_ROLE_ENUM.ASSISTANT,
    parts: [
      { type: "step-start" },
      {
        type: "text",
        text: `Absolutely! Sourdough looks intimidating, but it's really just **flour**, **water**, **salt**, and *time*.

## What you'll need

- A kitchen scale (this matters more than anything else)
- A large jar for your starter
- A mixing bowl and a clean kitchen towel
- A heavy pot with a lid, such as a Dutch oven
  - Cast iron works great
  - Enamelled versions are easier to clean

## Getting started

1. Mix \`50 g\` of whole wheat flour with \`50 g\` of lukewarm water in your jar.
2. Cover it loosely and leave it somewhere warm for 24 hours.
3. Discard all but a spoonful, then feed it with fresh flour and water.
4. Repeat daily until it's bubbly and doubles in size.

> Don't worry if nothing happens for the first couple of days. That's completely normal.

---

If you want a reliable beginner reference, the [King Arthur Baking](https://www.kingarthurbaking.com/) site is a good place to start.`,
        state: CHAT_MESSAGE_STREAM_STATE_ENUM.DONE,
      },
    ],
    threadId: MOCK_MARKDOWN_THREAD_ID,
    createdAt: new Date("2026-11-09T14:00:06.000Z"),
    updatedAt: new Date("2026-11-09T14:00:15.000Z"),
  },
  {
    id: "01a1c09c-8a98-705e-8dd7-aa918da197e2" as ChatMessageId,
    role: CHAT_MESSAGE_ROLE_ENUM.USER,
    parts: [{ type: "text", text: "how long until the starter is ready?" }],
    threadId: MOCK_MARKDOWN_THREAD_ID,
    createdAt: new Date("2026-11-09T14:00:47.000Z"),
    updatedAt: new Date("2026-11-09T14:00:47.000Z"),
  },
  {
    id: "01a1c09c-9e20-73a0-ad6f-1b8a639e3ab9" as ChatMessageId,
    role: CHAT_MESSAGE_ROLE_ENUM.ASSISTANT,
    parts: [
      { type: "step-start" },
      {
        type: "text",
        text: `Usually **5 to 10 days**, though it depends on your kitchen's temperature.

You'll know it's ready when it:

1. Doubles in volume within 4 to 8 hours after feeding
2. Has lots of bubbles throughout, not just on top
3. Smells pleasantly tangy, a bit like yogurt

A warmer spot speeds things up, while a cold kitchen can take *a lot* longer.`,
        state: CHAT_MESSAGE_STREAM_STATE_ENUM.DONE,
      },
    ],
    threadId: MOCK_MARKDOWN_THREAD_ID,
    createdAt: new Date("2026-11-09T14:00:52.000Z"),
    updatedAt: new Date("2026-11-09T14:00:57.000Z"),
  },
  {
    id: "01a1c09d-55b8-7c59-9b39-018079af5593" as ChatMessageId,
    role: CHAT_MESSAGE_ROLE_ENUM.USER,
    parts: [
      {
        type: "text",
        text: "my starter smells like nail polish remover, is that bad?",
      },
    ],
    threadId: MOCK_MARKDOWN_THREAD_ID,
    createdAt: new Date("2026-11-09T14:01:39.000Z"),
    updatedAt: new Date("2026-11-09T14:01:39.000Z"),
  },
  {
    id: "01a1c09d-6940-7199-9bf1-7993529c49a5" as ChatMessageId,
    role: CHAT_MESSAGE_ROLE_ENUM.ASSISTANT,
    parts: [
      { type: "step-start" },
      {
        type: "text",
        text: `Not bad, just **hungry**! That sharp acetone smell means the starter has run out of food.

### What to do

Feed it more often, or use a higher ratio of fresh flour and water to starter. Try \`1:2:2\` (starter, flour, water) for a few days.

> Think of it as a pet. If it smells strange, it's probably telling you it wants dinner.

Give it a stir, feed it, and check back in a few hours.\\
The smell should mellow out quickly.`,
        state: CHAT_MESSAGE_STREAM_STATE_ENUM.DONE,
      },
    ],
    threadId: MOCK_MARKDOWN_THREAD_ID,
    createdAt: new Date("2026-11-09T14:01:44.000Z"),
    updatedAt: new Date("2026-11-09T14:01:50.000Z"),
  },
  {
    id: "01a1c09e-5f58-7278-8b0a-3cf4341a862d" as ChatMessageId,
    role: CHAT_MESSAGE_ROLE_ENUM.USER,
    parts: [
      {
        type: "text",
        text: "ok and what about the actual bread? give me a simple schedule",
      },
    ],
    threadId: MOCK_MARKDOWN_THREAD_ID,
    createdAt: new Date("2026-11-09T14:02:47.000Z"),
    updatedAt: new Date("2026-11-09T14:02:47.000Z"),
  },
  {
    id: "01a1c09e-7ab0-7f46-b075-40410f1e3e89" as ChatMessageId,
    role: CHAT_MESSAGE_ROLE_ENUM.ASSISTANT,
    parts: [
      { type: "step-start" },
      {
        type: "text",
        text: `# Simple sourdough schedule

This is a classic overnight method. Once your starter is active, it fits nicely around a normal day.

## The recipe

- \`500 g\` bread flour
- \`350 g\` water
- \`100 g\` active starter
- \`10 g\` salt

## The timeline

1. **Morning (8:00)**: Feed your starter so it's peaking by midday.
2. **Midday (12:00)**: Mix everything together until no dry flour remains.
   - Rest for 30 minutes
   - Then do a set of *stretch and folds*
3. **Afternoon**: Repeat the stretch and folds three or four times, about every 30 minutes.
4. **Evening (18:00)**: Shape the dough and place it in a floured bowl.
5. **Overnight**: Cover and refrigerate for 8 to 12 hours.
6. **Next morning**: Bake at \`230 °C\` for 20 minutes with the lid on, then 20 more with it off.

---

For a visual walkthrough of the folding technique, search for a "stretch and fold" video on [YouTube][yt]. It's much easier to learn by watching.

[yt]: https://www.youtube.com/`,
        state: CHAT_MESSAGE_STREAM_STATE_ENUM.DONE,
      },
    ],
    threadId: MOCK_MARKDOWN_THREAD_ID,
    createdAt: new Date("2026-11-09T14:02:54.000Z"),
    updatedAt: new Date("2026-11-09T14:03:06.000Z"),
  },
  {
    id: "01a1c09f-45d0-70a8-a327-1ec49c92d0d4" as ChatMessageId,
    role: CHAT_MESSAGE_ROLE_ENUM.USER,
    parts: [{ type: "text", text: "thanks, can you sum up the key points?" }],
    threadId: MOCK_MARKDOWN_THREAD_ID,
    createdAt: new Date("2026-11-09T14:03:46.000Z"),
    updatedAt: new Date("2026-11-09T14:03:46.000Z"),
  },
  {
    id: "01a1c09f-5d40-74ff-b8af-e602a1589058" as ChatMessageId,
    role: CHAT_MESSAGE_ROLE_ENUM.ASSISTANT,
    parts: [
      { type: "step-start" },
      {
        type: "text",
        text: `Sure! Here's the short version.

### Starter

- Feed it daily until it's bubbly and *predictable*
- A sharp smell means it's hungry, not ruined

### Dough

- Use a scale, always
- Fold gently, don't knead aggressively
- A long, cold rest gives you better flavor

### Baking

- Preheat your pot for a full **45 minutes**
- Bake covered first to trap steam

> Your first loaf probably won't be perfect, and that's fine. Every loaf teaches you something.

More reading: <https://www.kingarthurbaking.com/>`,
        state: CHAT_MESSAGE_STREAM_STATE_ENUM.DONE,
      },
    ],
    threadId: MOCK_MARKDOWN_THREAD_ID,
    createdAt: new Date("2026-11-09T14:03:52.000Z"),
    updatedAt: new Date("2026-11-09T14:04:00.000Z"),
  },
  {
    id: "01a1c09f-bb00-76d6-88e5-258c8e9021c7" as ChatMessageId,
    role: CHAT_MESSAGE_ROLE_ENUM.USER,
    parts: [{ type: "text", text: "perfect, thank you!" }],
    threadId: MOCK_MARKDOWN_THREAD_ID,
    createdAt: new Date("2026-11-09T14:04:16.000Z"),
    updatedAt: new Date("2026-11-09T14:04:16.000Z"),
  },
  {
    id: "01a1c09f-c6b8-7aba-8983-b7b026dabae2" as ChatMessageId,
    role: CHAT_MESSAGE_ROLE_ENUM.ASSISTANT,
    parts: [
      { type: "step-start" },
      {
        type: "text",
        text: `Happy baking! 🍞

*Let me know how the first loaf turns out.*`,
        state: CHAT_MESSAGE_STREAM_STATE_ENUM.DONE,
      },
    ],
    threadId: MOCK_MARKDOWN_THREAD_ID,
    createdAt: new Date("2026-11-09T14:04:19.000Z"),
    updatedAt: new Date("2026-11-09T14:04:21.000Z"),
  },
];
