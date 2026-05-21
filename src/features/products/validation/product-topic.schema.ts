import z from "zod";

export const productTopicSchema = z.object({
  name: z.string().min(2, "Nazwa tematu musi zawierać conajmniej dwa znaki"),
});
export type ProductTopicFormData = z.infer<typeof productTopicSchema>;
