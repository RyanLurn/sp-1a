import { cn } from "cn";
import { Streamdown } from "streamdown";

export function Markdown({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return <Streamdown className={cn("typeset", className)}>{text}</Streamdown>;
}
