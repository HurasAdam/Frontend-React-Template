import type { AxiosError } from "axios";
import { toast } from "sonner";

import { Package } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog";
import queryClient from "../../../config/query.config";

import { useUpdateProductMutation } from "../../../hooks/products/mutations/use-products.mutations";
import { useFindOneProductQuery } from "../../../hooks/products/queries/use-products.queries";
import type { CreateProductPayload } from "../validation/product.schema";
import { ProductForm } from "./ProductForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  productId?: string;
  closeOnOutsideClick?: boolean;
}

export const EditProductModal = ({
  isOpen,
  onClose,
  productId,
  closeOnOutsideClick,
}: Props) => {
  const { data: productData } = useFindOneProductQuery(productId);
  const { mutate, isPending } = useUpdateProductMutation();

  const onSubmit = (data: CreateProductPayload) => {
    if (!productData) return;
    mutate(
      { id: productData?.id, payload: data },
      {
        onSuccess: () => {
          onClose();
          queryClient.invalidateQueries({
            queryKey: ["product", productData.id],
          });
          toast.success("Dodano nowy produkt", {
            position: "bottom-right",
          });
        },
        onError: (error) => {
          const { status } = error as AxiosError;

          if (status === 403) {
            toast.error("Brak uprawnień", {
              description:
                "Nie posiadasz wymaganych uprawnień do wykonania tej operacji.",
              position: "bottom-right",
              duration: 7000,
            });
            return;
          }

          if (status === 409) {
            toast.error("Niepowodzenie", {
              description:
                "Produkt o tej nazwie już istnieje. Nazwa produktu musi być unikalna.",
              position: "bottom-right",
              duration: 7000,
            });
            return;
          }

          toast.error("Wystąpił błąd serwera", {
            position: "bottom-right",
          });
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
      modal={true}
    >
      <DialogContent
        {...(!closeOnOutsideClick
          ? { onInteractOutside: (e) => e.preventDefault() }
          : {})}
        className="
    max-h-[85vh] overflow-y-auto

    rounded-2xl
   
    bg-background/80
    backdrop-blur-xl
    shadow-2xl
    p-0
    
      w-full
  sm:max-w-[640px]
      lg:max-w-lg
      
  "
      >
        <div className="px-6 pt-6 pb-4 border-b ">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Package className="w-6 h-6" />
            </div>

            <div>
              <DialogTitle className="text-lg font-semibold tracking-tight">
                Edytuj produkt
              </DialogTitle>

              <p className="text-sm text-muted-foreground mt-1">
                Dodaj produkt do systemu i przypisz jego właściwości
              </p>
            </div>
          </div>
        </div>

        <div className="px-8 py-6">
          {!productData ? (
            <div>Ładowanie</div>
          ) : (
            <ProductForm
              defaultValues={{
                name: productData.name,
                labelColor: productData.labelColor,
              }}
              onSubmit={onSubmit}
              submitText="Zapisz"
              isSubmitting={isPending}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
