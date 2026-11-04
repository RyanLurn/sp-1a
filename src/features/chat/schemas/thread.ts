import { z } from "zod";

import type { ChatThreadId } from "@/features/chat/types";

export const ChatThreadIdSchema = z
  .uuidv7()
  .transform((value) => value as ChatThreadId);
