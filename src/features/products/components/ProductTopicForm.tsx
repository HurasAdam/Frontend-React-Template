import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type ProductCategoryFormData } from "../validation/product-category.schema";
import { productTopicSchema } from "../validation/product-topic.schema";

interface CategoryFormProps {
  defaultValues: ProductCategoryFormData;
  onSubmit: (data: ProductCategoryFormData) => void;
  submitText?: string;
  isSubmitting?: boolean;
}

export const ProductTopicForm = ({
  defaultValues,
  onSubmit,
  submitText = "Zapisz",
  isSubmitting = false,
}: CategoryFormProps) => {
  const form = useForm({
    resolver: zodResolver(productTopicSchema),
    defaultValues,
  });

  const isDirty = form.formState.isDirty;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 py-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nazwa</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nazwa tematu" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end ">
          <Button type="submit" disabled={isSubmitting || !isDirty}>
            {isSubmitting ? "Zapisywanie..." : submitText}
          </Button>
        </div>
      </form>
    </Form>
  );
};
