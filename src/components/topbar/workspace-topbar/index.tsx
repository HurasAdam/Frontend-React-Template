import { cn } from "@/lib/utils";
import { ArrowLeft, Menu, Settings, type LucideIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  PageContainer,
  type PageContainerVariant,
} from "../../shared/PageContainer";

type BreadcrumbItemData = {
  label: string;
  href?: string;
  icon?: LucideIcon;
  iconClassName?: string;
};

type TopBarProps = {
  breadcrumbs: BreadcrumbItemData[];

  rootBreadcrumb?: BreadcrumbItemData;

  onBack?: () => void;
  onToggleMobileSidebar?: () => void;
  workspaceId?: string;
  containerVariant?: PageContainerVariant;
};

export function TopBar({
  breadcrumbs,
  rootBreadcrumb,
  onBack,
  onToggleMobileSidebar,
  workspaceId,
  containerVariant = "default",
}: TopBarProps) {
  const navigate = useNavigate();

  const allBreadcrumbs = rootBreadcrumb
    ? [rootBreadcrumb, ...breadcrumbs]
    : breadcrumbs;

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-card/95 backdrop-blur-md">
      <PageContainer variant={containerVariant}>
        <div className="flex min-h-[76px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          {/* Left */}
          <div className="flex min-w-0 flex-1 items-center gap-3.5">
            {onToggleMobileSidebar && (
              <button
                type="button"
                onClick={onToggleMobileSidebar}
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-lg",
                  "border border-border bg-background",
                  "text-muted-foreground transition-colors",
                  "hover:bg-accent hover:text-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                  "lg:hidden",
                )}
                aria-label="Otwórz menu"
              >
                <Menu className="size-4" />
              </button>
            )}

            {onBack && (
              <>
                <button
                  type="button"
                  onClick={onBack}
                  className={cn(
                    "group flex size-9 shrink-0 items-center justify-center rounded-lg",
                    "border border-border bg-background",
                    "text-muted-foreground transition-colors",
                    "hover:bg-accent hover:text-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                  )}
                  aria-label="Wróć"
                  title="Wróć"
                >
                  <ArrowLeft className="size-4 transition-transform duration-150 group-hover:-translate-x-0.5" />
                </button>

                <div className="h-5 w-px shrink-0 bg-border" />
              </>
            )}

            {/* Breadcrumbs */}
            <div className="min-w-0 flex-1 overflow-hidden">
              <Breadcrumb>
                <BreadcrumbList className="min-w-0 flex-nowrap">
                  {allBreadcrumbs.map((breadcrumb, index) => {
                    const isLast = index === allBreadcrumbs.length - 1;
                    const Icon = breadcrumb.icon;

                    return (
                      <div
                        key={`${breadcrumb.label}-${index}`}
                        className="flex min-w-0 items-center"
                      >
                        {index > 0 && (
                          <BreadcrumbSeparator className="mx-1.5 shrink-0">
                            <span
                              aria-hidden="true"
                              className="block size-1 rounded-full bg-muted-foreground/50"
                            />
                          </BreadcrumbSeparator>
                        )}

                        <BreadcrumbItem
                          className={cn(
                            "min-w-0",
                            isLast && "flex-1 overflow-hidden",
                          )}
                        >
                          {breadcrumb.href && !isLast ? (
                            <BreadcrumbLink asChild>
                              <Link
                                to={breadcrumb.href}
                                className={cn(
                                  "flex max-w-[220px] items-center gap-1.5 truncate",
                                  "sm:max-w-[300px] lg:max-w-[360px]",
                                )}
                              >
                                {Icon && (
                                  <Icon
                                    className={cn(
                                      "size-3.5 shrink-0",
                                      breadcrumb.iconClassName ??
                                        "text-muted-foreground",
                                    )}
                                  />
                                )}

                                <span className="truncate">
                                  {breadcrumb.label}
                                </span>
                              </Link>
                            </BreadcrumbLink>
                          ) : (
                            <BreadcrumbPage
                              className={cn(
                                "flex min-w-0 items-center gap-1.5",
                                "max-w-[280px] truncate",
                                "sm:max-w-[420px]",
                                "lg:max-w-[600px]",
                                "font-medium",
                              )}
                              title={breadcrumb.label}
                            >
                              {Icon && (
                                <Icon
                                  className={cn(
                                    "size-3.5 shrink-0",
                                    breadcrumb.iconClassName ??
                                      "text-muted-foreground",
                                  )}
                                />
                              )}

                              <span className="min-w-0 truncate">
                                {breadcrumb.label}
                              </span>
                            </BreadcrumbPage>
                          )}
                        </BreadcrumbItem>
                      </div>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>

          {/* Right */}
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/")}
              className={cn(
                "inline-flex h-9 items-center justify-center rounded-md px-3",
                "border border-border bg-background",
                "text-sm font-medium text-muted-foreground",
                "shadow-sm transition-colors",
                "hover:bg-accent hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
              )}
            >
              Powrót do BW
            </button>

            <div className="mx-1 h-5 w-px bg-border" />

            <button
              onClick={() => navigate(`/workspace/${workspaceId}/settings`)}
              type="button"
              className={cn(
                "flex size-9 items-center justify-center rounded-md",
                "text-muted-foreground transition-colors",
                "hover:bg-accent hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
              )}
              aria-label="Ustawienia"
              title="Ustawienia"
            >
              <Settings className="size-4" />
            </button>
          </div>
        </div>
      </PageContainer>
    </header>
  );
}
