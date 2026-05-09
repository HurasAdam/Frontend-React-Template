import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { tagSchema, type CreateTagPayload } from "../validation/tag.schema";

interface TagFormProps {
  defaultValues: CreateTagPayload;
  onSubmit: (data: CreateTagPayload) => void;
  submitText?: string;
  isSubmitting?: boolean;
}

export const TagForm = ({
  defaultValues,
  onSubmit,
  submitText = "Zapisz",
  isSubmitting = false,
}: TagFormProps) => {
  const form = useForm<CreateTagPayload>({
    resolver: zodResolver(tagSchema),
    defaultValues,
  });

  const isDirty = form.formState.isDirty;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6.5 py-4 "
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1">Nazwa</FormLabel>
              <FormControl>
                <Input className="" {...field} placeholder="np. zastępstwa" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end ">
          <Button size="lg" type="submit" disabled={isSubmitting || !isDirty}>
            {isSubmitting ? "Zapisywanie..." : submitText}
          </Button>
        </div>
      </form>
    </Form>
  );
};
