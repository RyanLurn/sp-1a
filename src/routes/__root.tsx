import type { ReactNode } from "react";

import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import { ThemeProvider } from "@/components/theme/provider";
import { ThemeToggle } from "@/components/theme/toggle";
import { Toaster } from "@/components/ui/toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import styles from "@/styles/index.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        title: "Command Center",
      },
    ],
    links: [
      { rel: "stylesheet", href: styles },
      { type: "image/svg+xml", href: "/favicon.svg", rel: "icon" },
    ],
  }),
  shellComponent: AppShell,
});

function AppShell({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider defaultTheme="system" storageKey="theme">
          <TooltipProvider>
            <ThemeToggle className="fixed top-3 right-3" />
            <div className="h-dvh">{children}</div>
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
