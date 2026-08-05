import { useParams } from "react-router-dom";
import { useFindOneWorkspaceArticleQuery } from "../../../../../../hooks/workspace-articles/queries/use-workspace-articles.queries";

export function WorkspaceArticlePage() {
  const { id: workspaceId, articleId } = useParams();
  const { data } = useFindOneWorkspaceArticleQuery(workspaceId, articleId);

  return <div>ArticlePage</div>;
}
