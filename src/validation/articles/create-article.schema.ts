import { z } from "zod";

export const createArticleSchema = z.object({
  title: z.string().trim().min(3).max(255),
  internalNote: z.string().trim().min(1).max(9000),

  product: z.string().min(1),
  category: z.string().min(1),

  responseTemplates: z
    .array(
      z.object({
        version: z.number(),
        variantName: z.string().optional(),
        variantContent: z.string().min(1),
      }),
    )
    .min(1),
});

export type CreateArticlePayload = z.infer<typeof createArticleSchema>;
