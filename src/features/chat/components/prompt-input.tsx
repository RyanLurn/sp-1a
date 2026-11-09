import type { ComponentProps, SubmitEvent } from "react";
import type { Except } from "type-fest";

import { useRef, useState } from "react";

import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";

interface ChatPromptInputProps extends Except<
  ComponentProps<"form">,
  "ref" | "onSubmit"
> {
  sendMessage: ({ text }: { text: string }) => Promise<void>;
}

export function ChatPromptInput({
  sendMessage,
  ...props
}: ChatPromptInputProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [text, setText] = useState("");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (text.trim().length === 0) {
      return;
    }
    void sendMessage({ text });
    setText("");
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} {...props}>
      <InputGroup>
        <InputGroupTextarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Enter your message..."
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              formRef.current?.requestSubmit();
            }
          }}
          className="p-3"
        ></InputGroupTextarea>
      </InputGroup>
    </form>
  );
}
