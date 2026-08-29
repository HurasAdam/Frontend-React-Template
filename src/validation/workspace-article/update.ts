// validation/workspace-article.schema.ts
import { z } from "zod";

export const updateWorkspaceArticleSchema = z.object({
  title: z.string().min(1),
  folderId: z.string().min(1),
});

export type UpdateWorkspaceArticleFormData = z.infer<
  typeof updateWorkspaceArticleSchema
>;
