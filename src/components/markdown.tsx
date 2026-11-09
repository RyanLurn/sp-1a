import { Streamdown } from "streamdown";

export function Markdown({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return <Streamdown className={className}>{text}</Streamdown>;
}
