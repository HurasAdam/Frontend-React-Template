/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Bell, ClipboardPenLine, Plus, Settings } from "lucide-react";
import { Link } from "react-router-dom";

import { AppBreadcrumbs } from "../breadcrumbs/AppBreadcrumbs";
import { Button } from "../ui/button";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";

export const AppHeader = () => {
  const { isMobile } = useSidebar();

  return (
    <header className="sticky top-0 z-20 flex h-12 shrink-0 items-center justify-between border-b border-border/60 bg-background/90 px-6 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between">
        {/* Navigation */}
        <div className="flex min-w-0 items-center gap-3">
          <SidebarTrigger className="size-9 shrink-0 rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" />

          <div className="h-5 w-px shrink-0 bg-border/70" />

          <AppBreadcrumbs />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            asChild
            size="icon"
            variant="ghost"
            className="size-9 rounded-lg border border-border/60 bg-muted/40 text-foreground shadow-none transition-colors hover:bg-muted"
            title="Dodaj artykuł"
            aria-label="Dodaj artykuł"
          >
            <Link to="/articles/new">
              <Plus className="size-[17px]" />
            </Link>
          </Button>

          <Button
            asChild
            size="icon"
            variant="ghost"
            className="size-9 rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            title="Odnotuj temat"
            aria-label="Odnotuj temat"
          >
            <Link to="/register-activity">
              <ClipboardPenLine className="size-[17px]" />
            </Link>
          </Button>

          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="size-9 rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            title="Powiadomienia"
            aria-label="Powiadomienia"
          >
            <Bell className="size-[17px]" />
          </Button>

          <div className="mx-2 h-5 w-px bg-border/70" />

          <Button
            asChild
            size="icon"
            variant="ghost"
            className="size-9 rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            title="Ustawienia"
            aria-label="Ustawienia"
          >
            <Link to="/settings">
              <Settings className="size-[17px]" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
