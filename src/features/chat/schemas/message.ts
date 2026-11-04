import { z } from "zod";

import type { ChatMessageId } from "@/features/chat/types";

export const ChatMessageIdSchema = z
  .uuidv7()
  .transform((value) => value as ChatMessageId);
