import { Check, Loader2, MessageSquare, Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Textarea } from "../../../../components/ui/textarea";

import { useAddContactRecordMutation } from "../../../../hooks/contact-registry/mutations/use-contact-registry.mutations";

import type { ContactType, Topic } from "../view/RegisterActivityPage";

import { ProductBadge } from "./ProductBadge";

interface Props {
  topic: Topic;
}

interface TopicFormValues {
  note: string;
}

export function TopicRow({ topic }: Props) {
  const { register, reset, getValues } = useForm<TopicFormValues>({
    defaultValues: {
      note: "",
    },
  });

  const { mutateAsync, isPending } = useAddContactRecordMutation();

  const [pendingType, setPendingType] = useState<ContactType | null>(null);
  const [successType, setSuccessType] = useState<ContactType | null>(null);

  const handleContact = async (type: ContactType) => {
    const { note } = getValues();

    try {
      setPendingType(type);

      await mutateAsync({
        topicId: topic.id,
        type,
        ...(note.trim() ? { note: note.trim() } : {}),
      });

      reset();
      setSuccessType(type);

      toast.success(
        type === "phone"
          ? `Odnotowano kontakt telefoniczny · ${topic.name}`
          : `Odnotowano wiadomość · ${topic.name}`,
      );

      window.setTimeout(() => {
        setSuccessType(null);
      }, 1500);
    } catch {
      toast.error(`Nie udało się odnotować kontaktu · ${topic.name}`);
    } finally {
      setPendingType(null);
    }
  };

  const renderIcon = (type: ContactType) => {
    if (isPending && pendingType === type) {
      return <Loader2 className="size-4 animate-spin" />;
    }

    if (successType === type) {
      return (
        <Check className="size-4 text-emerald-600 dark:text-emerald-400" />
      );
    }

    return type === "message" ? (
      <MessageSquare className="size-4" />
    ) : (
      <Phone className="size-4" />
    );
  };

  return (
    <Card className="group overflow-hidden rounded-xl border-border/70 bg-card shadow-none transition-colors duration-200 hover:border-border hover:bg-muted/[0.12]">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 items-center gap-4 px-4 py-4 sm:px-5 lg:grid-cols-[minmax(200px,1fr)_minmax(240px,1.3fr)_auto] lg:gap-6">
          {/* Topic information */}

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold tracking-tight text-foreground">
              {topic.name}
            </h3>

            <div className="mt-2">
              <ProductBadge product={topic.product} />
            </div>
          </div>

          {/* Optional note */}

          <div className="min-w-0">
            <Textarea
              {...register("note")}
              placeholder="Dodaj notatkę (opcjonalnie)..."
              aria-label={`Notatka do tematu: ${topic.name}`}
              rows={1}
              disabled={isPending}
              className="
                min-h-[42px] max-h-24 resize-y
                rounded-lg border-border/60
                bg-muted/25 px-3 py-2.5
                text-sm leading-relaxed shadow-none
                placeholder:text-muted-foreground/55
                transition-colors
                focus-visible:border-primary/40
                focus-visible:bg-background
                focus-visible:ring-2
                focus-visible:ring-primary/10
                disabled:opacity-60
              "
            />
          </div>

          {/* Contact actions */}

          <div className="flex items-center gap-2 lg:justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isPending}
              onClick={() => handleContact("message")}
              aria-label="Odnotuj wiadomość"
              className="
                h-10 flex-1 gap-2 rounded-lg
                border-border/70 bg-background
                px-3 text-xs font-medium
                text-muted-foreground shadow-none
                transition-colors
                hover:border-border hover:bg-muted
                hover:text-foreground
                sm:flex-none
              "
            >
              {renderIcon("message")}
              <span>Wiadomość</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isPending}
              onClick={() => handleContact("phone")}
              aria-label="Odnotuj kontakt telefoniczny"
              className="
                h-10 flex-1 gap-2 rounded-lg
                border-border/70 bg-background
                px-3 text-xs font-medium
                text-muted-foreground shadow-none
                transition-colors
                hover:border-border hover:bg-muted
                hover:text-foreground
                sm:flex-none
              "
            >
              {renderIcon("phone")}
              <span>Telefon</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
