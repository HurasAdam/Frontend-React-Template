import { z } from "zod";

export const editUserSchema = z.object({
  name: z.string().min(1, "Imię jest wymagane"),
  surname: z.string().min(1, "Nazwisko jest wymagane"),
});

export type EditUserPayload = z.infer<typeof editUserSchema>;
