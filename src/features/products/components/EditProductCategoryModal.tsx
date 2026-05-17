import type { AxiosError } from "axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import queryClient from "../../../config/query.config";
import {
  useFindOneProductCategoryQuery,
  useUpdateProductCategoryMutation,
} from "../../../hooks/product-categories/use-product-categories";
import type { ProductCategoryFormData } from "../validation/product-category.schema";
import { ProductCategoryForm } from "./ProductCategoryForm";

interface CreateWorkspaceProps {
  isOpen: boolean;
  onClose: () => void;
  closeOnOutsideClick?: boolean;
  product: {
    id: string;
    name: string;
  } | null;
  categoryId: string | null;
}

export const EditProductCategoryModal = ({
  isOpen,
  onClose,
  closeOnOutsideClick = false,
  product,
  categoryId,
}: CreateWorkspaceProps) => {
  const { data: productCategory } = useFindOneProductCategoryQuery(categoryId);
  const { mutate, isPending } = useUpdateProductCategoryMutation();

  const onSubmit = (data: ProductCategoryFormData) => {
    if (!productCategory || !product) return;

    mutate(
      {
        id: productCategory.id,
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
                <div style={{ fontWeight: 600 }}>Nie można dodać kategorii</div>
                <div style={{ opacity: 0.8 }}>
                  Dla produktu <b>{product.name}</b> istnieje już kategoria o
                  tej nazwie.
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
          max-w-2xl
            sm:max-w-110
          p-0
          overflow-hidden
          rounded-3xl
          border-0
          bg-background
          shadow-2xl
        "
      >
        {/* HEADER */}
        <div className="px-8 pt-8 pb-6 border-b bg-muted/30">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold tracking-tight">
              Edytuj kategorię
            </DialogTitle>

            <p className="text-sm text-muted-foreground mt-1">
              Zmień nazwę kategorii przypisanej do produktu.
            </p>
          </DialogHeader>

          {/* PRODUCT CONTEXT */}
          {product && (
            <div className="mt-5 rounded-2xl border bg-background px-4 py-3">
              <div className="text-xs text-muted-foreground mb-1"></div>

              <div className="flex items-center justify-between">
                <div className="font-medium text-sm">{product.name}</div>
              </div>
            </div>
          )}
        </div>

        {/* FORM */}
        <div className="px-8 py-6">
          {!productCategory ? (
            <div>Ładowanie</div>
          ) : (
            <ProductCategoryForm
              onSubmit={onSubmit}
              defaultValues={{ name: productCategory.name }}
              isSubmitting={isPending}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
