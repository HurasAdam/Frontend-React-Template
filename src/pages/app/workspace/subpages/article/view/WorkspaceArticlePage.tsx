// pages/workspace/article/WorkspaceArticlePage.tsx
import { AlertCircle, FileText } from "lucide-react";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { useFindOneWorkspaceArticleQuery } from "../../../../../../hooks/workspace-articles/queries/use-workspace-articles.queries";
import { ArticleDetailView } from "../components/ArticleDetailsView";

export function WorkspaceArticlePage() {
  const { id: workspaceId, articleId } = useParams();
  const { data, isLoading, isError, refetch } = useFindOneWorkspaceArticleQuery(
    workspaceId,
    articleId,
  );

  if (isLoading) return <ArticlePageSkeleton />;

  if (isError) {
    return (
      <StatePanel
        icon={<AlertCircle className="size-5 text-destructive" />}
        title="Nie udało się pobrać artykułu"
        description="Sprawdź połączenie i spróbuj ponownie."
        action={<Button onClick={() => refetch()}>Spróbuj ponownie</Button>}
      />
    );
  }

  if (!data) {
    return (
      <StatePanel
        icon={<FileText className="size-5 text-muted-foreground" />}
        title="Artykuł nie istnieje"
        description="Mógł zostać usunięty lub przeniesiony do innego folderu."
      />
    );
  }

  return <ArticleDetailView article={data} />;
}

function StatePanel({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full  flex-col items-center justify-center gap-3 px-5 text-center">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary">
        {icon}
      </span>
      <h1 className="text-lg font-semibold">{title}</h1>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      {action}
    </div>
  );
}

function ArticlePageSkeleton() {
  return (
    <div className="mx-auto w-full  sm:px-8 sm:py-12">
      <Skeleton className="h-6 w-72" />
      <Skeleton className="mt-6 h-12 w-1/2" />
      <Skeleton className="mt-3 h-4 w-96" />
      <div className="mt-10 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-xl" />
          ))}
          <Skeleton className="mt-4 h-32 w-full rounded-xl" />
        </div>
        <Skeleton className="h-[420px] w-full rounded-xl" />
      </div>
    </div>
  );
}
