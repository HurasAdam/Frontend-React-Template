import { z } from "zod";

export const usefulLinkSchema = z.object({
  name: z.string().min(1, "Nazwa linku jest wymagana"),
  url: z.string().min(3, "Podaj poprawny adres URL"),
  description: z.string().optional(),
  linkCategory: z.string().min(1, "Wybierz kategorię"),
  isFeatured: z.boolean().optional(),
});

export type CreateUsefullLinkPayload = z.infer<typeof usefulLinkSchema>;
