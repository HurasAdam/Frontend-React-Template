// validation/workspace-article.schema.ts
import { z } from "zod";

export const addWorkspaceArticleSchema = z.object({
  title: z.string().min(1),
  folderId: z.string().min(1),
  marker: z.string().optional(),

  responseVariant: z.object({
    variantName: z.string().min(1),
    variantContent: z.string().min(1),
  }),
});

export type AddWorkspaceArticleFormData = z.infer<
  typeof addWorkspaceArticleSchema
>;
