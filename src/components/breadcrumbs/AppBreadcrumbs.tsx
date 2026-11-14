/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { ArrowLeft } from "lucide-react";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useFindArticleQuery } from "@/hooks/articles/queries/use-articles.queries";

type BreadcrumbItem = {
  label: string;
  path: string;
};

type BreadcrumbRoute = {
  path: string;
  breadcrumbs: BreadcrumbItem[];
};

const breadcrumbRoutes: BreadcrumbRoute[] = [
  {
    path: "/dashboard",
    breadcrumbs: [{ label: "Strona główna", path: "/dashboard" }],
  },
  {
    path: "/articles",
    breadcrumbs: [{ label: "Artykuły", path: "/articles" }],
  },
  {
    path: "/articles/new",
    breadcrumbs: [
      { label: "Artykuły", path: "/articles" },
      { label: "Nowy artykuł", path: "/articles/new" },
    ],
  },
  {
    path: "/articles/:articleId",
    breadcrumbs: [
      { label: "Artykuły", path: "/articles" },
      { label: "Szczegóły artykułu", path: "" },
    ],
  },
  {
    path: "/articles/:articleId/edit",
    breadcrumbs: [
      { label: "Artykuły", path: "/articles" },
      { label: "Szczegóły artykułu", path: "" },
      { label: "Edytuj artykuł", path: "" },
    ],
  },
  {
    path: "/articles/:articleId/history",
    breadcrumbs: [
      { label: "Artykuły", path: "/articles" },
      { label: "Szczegóły artykułu", path: "" },
      { label: "Historia zmian", path: "" },
    ],
  },
  {
    path: "/draft-articles",
    breadcrumbs: [{ label: "Wersje robocze", path: "/draft-articles" }],
  },
  {
    path: "/review-scheduled-articles",
    breadcrumbs: [
      {
        label: "Artykuły do weryfikacji",
        path: "/review-scheduled-articles",
      },
    ],
  },
  {
    path: "/important-links",
    breadcrumbs: [{ label: "Przydatne linki", path: "/important-links" }],
  },
  {
    path: "/register-activity",
    breadcrumbs: [
      { label: "Rejestracja aktywności", path: "/register-activity" },
    ],
  },
  {
    path: "/settings",
    breadcrumbs: [{ label: "Ustawienia", path: "/settings" }],
  },
];

export function AppBreadcrumbs() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentRoute = breadcrumbRoutes.find((route) =>
    matchPath({ path: route.path, end: true }, location.pathname),
  );

  const articleMatch = matchPath(
    { path: "/articles/:articleId", end: false },
    location.pathname,
  );

  const articleId = articleMatch?.params.articleId;

  const { data: article } = useFindArticleQuery(articleId ?? "");

  if (!currentRoute) return null;

  const handleBack = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate("/articles");
    }
  };

  return (
    <div className="flex min-w-0 items-center gap-3 px-3">
      <Button
        variant="secondary"
        size="sm"
        aria-label="Wróć do poprzedniej strony"
        onClick={handleBack}
      >
        <ArrowLeft />
      </Button>

      <div className="h-5 w-px shrink-0 bg-border/70" />

      <nav
        aria-label="Okruszki"
        className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-xs"
      >
        {location.pathname !== "/dashboard" && (
          <Link
            to="/dashboard"
            className="shrink-0 text-foreground/80 transition-colors hover:text-foreground"
          >
            Strona główna
          </Link>
        )}

        {currentRoute.breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === currentRoute.breadcrumbs.length - 1;
          const isArticleDetails = breadcrumb.label === "Szczegóły artykułu";

          const label = isArticleDetails
            ? (article?.title ?? "Artykuł")
            : breadcrumb.label;

          const path = isArticleDetails
            ? `/articles/${articleId}`
            : breadcrumb.path;

          return (
            <div
              key={`${breadcrumb.label}-${index}`}
              className="flex min-w-0 shrink-0 items-center gap-2"
            >
              <span aria-hidden="true" className="text-muted-foreground/60">
                /
              </span>

              {isLast || !path ? (
                <span
                  className="max-w-[190px] truncate font-bold text-primary/95 sm:max-w-[260px]"
                  title={label}
                >
                  {label}
                </span>
              ) : (
                <Link
                  to={path}
                  className={`max-w-[190px] truncate transition-colors hover:text-foreground sm:max-w-[260px] ${
                    isArticleDetails
                      ? "font-light text-foreground/80"
                      : "text-foreground/80"
                  }`}
                  title={label}
                >
                  {label}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
