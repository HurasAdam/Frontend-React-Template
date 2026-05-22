import type { AxiosError } from "axios";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import queryClient from "../../../config/query.config";
import {
  useFindOneProductTopicQuery,
  useUpdateOneProductTopicMutation,
} from "../../../hooks/product-topics/use-product-topics";
import type { ProductCategoryFormData } from "../validation/product-category.schema";
import { ProductCategoryForm } from "./ProductCategoryForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  closeOnOutsideClick?: boolean;
  product: {
    id: string;
    name: string;
  } | null;
  topicId: string | null;
}

export const EditProductTopicModal = ({
  isOpen,
  onClose,
  closeOnOutsideClick = false,
  product,
  topicId,
}: Props) => {
  const { data: productTopic } = useFindOneProductTopicQuery(topicId);
  const { mutate, isPending } = useUpdateOneProductTopicMutation();

  const onSubmit = (data: ProductCategoryFormData) => {
    if (!productTopic || !product) return;

    mutate(
      {
        id: productTopic.id,
        payload: {
          name: data.name,
        },
      },
      {
        onSuccess: () => {
          onClose();

          toast.success("Kategoria została zaktualizowana", {
            position: "bottom-right",
          });

          queryClient.invalidateQueries({
            queryKey: ["product", product.id],
          });
        },
        onError: (error) => {
          const { status } = error as AxiosError;

          if (status === 409) {
            toast.error(
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontWeight: 600 }}>Nie można dokonać zmian</div>
                <div style={{ opacity: 0.8 }}>
                  Dla produktu <b>{product.name}</b> istnieje już temat o tej
                  nazwie.
                </div>
              </div>,
              { duration: 7000, position: "bottom-right" },
            );
            return;
          }

          toast.error("Wystąpił błąd, spróbuj ponownie");
        },
      },
    );
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      modal
    >
      <DialogContent
        {...(!closeOnOutsideClick
          ? { onInteractOutside: (e) => e.preventDefault() }
          : {})}
        className="
    sm:max-w-[500px]
    overflow-hidden
    rounded-[28px]
    border-0
    bg-background
    p-0
    shadow-2xl
  "
      >
        {/* HEADER */}
        <div
          className="
      border-b
      bg-muted/20
      px-8
      pt-8
      pb-7
    "
        >
          <DialogHeader className="space-y-0">
            <div className="space-y-5">
              {/* BADGE */}
              <div
                className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            bg-background
            px-3.5
            py-1.5
            text-[11px]
            font-medium
            tracking-[0.12em]
            text-muted-foreground
            shadow-sm
          "
              >
                <Pencil className="size-3.5" />
                Edycja tematu
              </div>

              {/* TITLE */}
              <div className="space-y-2">
                <DialogTitle
                  className="
              text-[26px]
              font-semibold
              tracking-[-0.03em]
            "
                >
                  Edytuj temat kontaktu
                </DialogTitle>

                <p
                  className="
              max-w-md
              text-[14px]
              leading-6
              text-muted-foreground
            "
                >
                  Wprowadź zmiany w nazwie tematu i zapisz, aby zaktualizować.
                </p>
              </div>
            </div>
          </DialogHeader>

          {/* PRODUCT CONTEXT */}
          {product && (
            <div
              className="
          mt-7
          flex
          items-center
          justify-between
          rounded-2xl
          border
          bg-background
          px-5
          py-4
          shadow-sm
        "
            >
              <div>
                <div
                  className="
              mb-1
              text-[11px]
              font-medium
              uppercase
              tracking-[0.14em]
              text-muted-foreground
            "
                >
                  Produkt
                </div>

                <div
                  className="
              text-[15px]
              font-semibold
              tracking-tight
            "
                >
                  {product.name}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FORM */}
        <div className="px-8 py-7">
          {!productTopic ? (
            <div>Ładowanie...</div>
          ) : (
            <ProductCategoryForm
              onSubmit={onSubmit}
              defaultValues={{ name: productTopic.name }}
              isSubmitting={isPending}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
