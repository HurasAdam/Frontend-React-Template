import { Text } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const VariantCard = () => {
  const { control } = useFormContext();

  const variantName = useWatch({
    control,
    name: "responseTemplates.0.variantName",
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 border-b border-border/60 pb-3">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Text className="size-4" />
        </div>

        <div>
          <p className="text-sm font-semibold">{variantName || "Wersja 1"}</p>

          <p className="text-xs text-muted-foreground">
            Treść odpowiedzi wysyłanej użytkownikowi
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <FormField
          control={control}
          name="responseTemplates.0.variantName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-muted-foreground">
                Nazwa szablonu
              </FormLabel>

              <FormControl>
                <Input
                  {...field}
                  placeholder="Np. Standardowa odpowiedź"
                  className="bg-background focus-visible:ring-primary/30"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="responseTemplates.0.variantContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-muted-foreground">
                Treść odpowiedzi
              </FormLabel>

              <FormControl>
                <Textarea
                  {...field}
                  rows={6}
                  placeholder="Wprowadź treść odpowiedzi dla użytkownika..."
                  className="min-h-[180px] resize-none bg-background focus-visible:ring-primary/30"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
