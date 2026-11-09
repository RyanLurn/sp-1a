import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { cn } from "cn";

import { RelativeTime } from "@/components/relative-time";
import { buttonVariants } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { mockChatThreads } from "@/features/chat/mock/threads";

export const Route = createFileRoute("/chat/{-$threadId}")({
  loader: () => mockChatThreads,
  component: ChatLayout,
});

function ChatLayout() {
  const { threadId } = Route.useParams();
  const threads = Route.useLoaderData();
  return (
    <SidebarProvider className="h-full">
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
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Threads</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {threads.map((thread) => (
                  <SidebarMenuItem key={thread.id}>
                    <SidebarMenuButton
                      isActive={threadId === thread.id}
                      render={
                        <Link
                          to="/chat/{-$threadId}"
                          params={{ threadId: thread.id }}
                        />
                      }
                      tooltip={{
                        children: (
                          <div>
                            <div>{thread.title}</div>
                            <div className="opacity-70">
                              Updated <RelativeTime date={thread.updatedAt} />
                            </div>
                            <div className="opacity-70">
                              Created <RelativeTime date={thread.createdAt} />
                            </div>
                          </div>
                        ),
                        hidden: false,
                      }}
                    >
                      <span>{thread.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className="flex-1">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
