import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/chat/{-$threadId}")({
  component: ChatLayout,
});

function ChatLayout() {
  return <Outlet />;
}
