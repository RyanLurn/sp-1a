import type { Tagged } from "type-fest";

import { v7 } from "uuid";

export function generateUuidV7() {
  return v7();
}

export function generateId<T extends Tagged<string, PropertyKey>>() {
  return generateUuidV7() as T;
}
