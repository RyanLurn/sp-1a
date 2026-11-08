import { formatRelativeTime } from "@/utils/format-relative-time";

export function RelativeTime({ date }: { date: Date }) {
  return <>{formatRelativeTime({ date })}</>;
}
