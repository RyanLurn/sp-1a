import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { cn } from "cn";

import { buttonVariants } from "@/components/ui/button";
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
          <SidebarHeader className="text-xl">AI Chat</SidebarHeader>
          <div className="relative w-full p-2">
            <Link
              to="/chat/{-$threadId}"
              params={{ threadId: undefined }}
              className={cn("w-full", buttonVariants())}
            >
              New chat
            </Link>
          </div>
        </Sidebar>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
