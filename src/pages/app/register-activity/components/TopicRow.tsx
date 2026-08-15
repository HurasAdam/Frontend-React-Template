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
      return <Loader2 className="h-3.5 w-3.5 animate-spin" />;
    }

    if (successType === type) {
      return <Check className="h-3.5 w-3.5 text-emerald-500" />;
    }

    return type === "message" ? (
      <MessageSquare className="h-3.5 w-3.5" />
    ) : (
      <Phone className="h-3.5 w-3.5" />
    );
  };

  return (
    <Card className="group overflow-hidden rounded-lg bg-card shadow-sm transition-shadow duration-200 hover:shadow-md">
      <CardContent className="p-0">
        <div className="px-5 py-4 sm:px-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: `${topic.product.labelColor}12`,
                  color: topic.product.labelColor,
                }}
              >
                <span className="text-xs font-bold">
                  {topic.name.slice(0, 1).toUpperCase()}
                </span>
              </div>

              <div className="min-w-0">
                <div className="truncate text-sm font-semibold tracking-[-0.01em]">
                  {topic.name}
                </div>

                <div className="mt-1">
                  <ProductBadge product={topic.product} />
                </div>
              </div>
            </div>

            <div className="flex w-1/2 items-center justify-center gap-20">
              <div className="w-full lg:max-w-[500px]">
                <Textarea
                  {...register("note")}
                  placeholder="Dodaj notatkę (opcjonalne)"
                  className="min-h-[42px] resize-none rounded-xl border-border/60 bg-muted/30 px-3 py-2 text-sm shadow-none transition-colors placeholder:text-muted-foreground/60 focus-visible:bg-background"
                  rows={1}
                  disabled={isPending}
                />
              </div>
              <div className="flex shrink-0 items-center gap-2.5">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  disabled={isPending}
                  onClick={() => handleContact("message")}
                  aria-label="Odnotuj wiadomość"
                  className="
      size-11
      rounded-xl
      border-border/70
      bg-background
      text-muted-foreground
      shadow-none
      transition-all
      duration-200
      hover:-translate-y-px
      hover:border-border
      hover:bg-muted/60
      hover:text-foreground
      hover:shadow-sm
      active:translate-y-0
      disabled:pointer-events-none
      disabled:opacity-50
    "
                >
                  {renderIcon("message")}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  disabled={isPending}
                  onClick={() => handleContact("phone")}
                  aria-label="Odnotuj kontakt telefoniczny"
                  className="
      size-11
      rounded-xl
      border-border/70
      bg-background
      text-muted-foreground
      shadow-none
      transition-all
      duration-200
      hover:-translate-y-px
      hover:border-border
      hover:bg-muted/60
      hover:text-foreground
      hover:shadow-sm
      active:translate-y-0
      disabled:pointer-events-none
      disabled:opacity-50
    "
                >
                  {renderIcon("phone")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
