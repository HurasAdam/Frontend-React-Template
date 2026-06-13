import { z } from "zod";

export const usefullLinkCategorySchema = z.object({
  name: z.string().min(1, "Nazwa kategorii jest wymagana"),
});

export type CreateUsefullLinkCategoryPayload = z.infer<
  typeof usefullLinkCategorySchema
>;
