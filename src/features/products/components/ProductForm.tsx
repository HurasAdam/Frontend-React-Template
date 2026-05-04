import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
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
import {
  productSchema,
  type CreateProductPayload,
} from "../validation/product.schema";

export const colorOptions = [
  "#6366F1", // indigo
  "#22C55E", // green
  "#F97316", // orange
  "#EF4444", // red
  "#EAB308", // yellow
  "#06B6D4", // cyan
  "#A855F7", // purple
  "#14B8A6", // teal
  "#EC4899", // pink
  "#84CC16", // lime
  "#3B82F6", // blue
  "#F43F5E", // rose
  "#10B981", // emerald
  "#F59E0B", // amber
  "#8B5CF6", // violet
];

interface ProductFormProps {
  defaultValues: CreateProductPayload;
  onSubmit: (data: CreateProductPayload) => void;
  submitText?: string;
  isSubmitting?: boolean;
}

export const ProductForm = ({
  defaultValues,
  onSubmit,
  submitText = "Zapisz",
  isSubmitting = false,
}: ProductFormProps) => {
  const form = useForm<CreateProductPayload>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  const isDirty = form.formState.isDirty;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6.5 py-4 "
      >
        {/* Nazwa produktu */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwa</FormLabel>
              <FormControl>
                <Input className="" {...field} placeholder="Nazwa produktu" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Kolor etykiety */}
        <FormField
          control={form.control}
          name="labelColor"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel>Kolor etykiety</FormLabel>
              <FormControl>
                <div className="flex gap-3 flex-wrap mb-4">
                  {colorOptions.map((color) => (
                    <div
                      key={color}
                      onClick={() => field.onChange(color)}
                      className={cn(
                        "w-6 h-6 rounded-sm cursor-pointer hover:opacity-80 transition-all duration-300",
                        field.value === color &&
                          "ring-2 ring-offset-2 ring-blue-500",
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
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
