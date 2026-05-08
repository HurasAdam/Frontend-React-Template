import z from "zod";

export const tagSchema = z.object({
  name: z.string().min(2, "Nazwa tagu musi zawierać conajmniej dwa znaki"),
});

export type CreateTagPayload = z.infer<typeof tagSchema>;
