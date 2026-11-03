import { z } from "zod";

export const createArticleSchema = z.object({
  title: z.string().trim().min(3).max(255),
  internalNote: z.string().trim().min(1).max(9000),

  product: z.string().min(1),
  category: z.string().min(1),
  tags: z.array(z.string()).min(1, "Wybierz co najmniej jeden tag"),
  responseVariant: z.object({
    variantName: z.string().min(2),
    variantContent: z.string().min(2),
  }),
});

export type CreateArticlePayload = z.infer<typeof createArticleSchema>;
