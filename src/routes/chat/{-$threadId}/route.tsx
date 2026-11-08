import { createFileRoute, Outlet } from "@tanstack/react-router";

import {
  Sidebar,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";

export const Route = createFileRoute("/chat/{-$threadId}")({
  component: ChatLayout,
});

function ChatLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-full w-full">
        <Sidebar>
          <SidebarHeader>AI Chat</SidebarHeader>
        </Sidebar>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
