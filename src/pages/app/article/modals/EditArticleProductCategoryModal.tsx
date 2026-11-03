/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import {
  Check,
  ChevronsUpDown,
  FolderTree,
  Info,
  Loader2,
  Package,
  Settings2,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { useFindCategoriesByProductQuery } from "../../../../hooks/product-categories/queries/use-product-categories.queries";
import { useFindProductsQuery } from "../../../../hooks/products/queries/use-products.queries";

type Props = {
  open: boolean;
  closeOnOutsideClick?: boolean;
  onClose: () => void;

  currentProductId: string;
  currentCategoryId: string;

  onSubmit: (payload: {
    product: string;
    category: string;
  }) => Promise<void> | void;

  isPending?: boolean;
};

export const UpdateArticleProductCategoryModal = ({
  open,
  closeOnOutsideClick,
  onClose,
  currentProductId,
  currentCategoryId,
  onSubmit,
  isPending = false,
}: Props) => {
  const [selectedProductId, setSelectedProductId] = useState(currentProductId);

  const [selectedCategoryId, setSelectedCategoryId] =
    useState(currentCategoryId);

  const [productOpen, setProductOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const { data: products = [], isFetching: isProductsFetching } =
    useFindProductsQuery({});

  const { data: categories = [], isFetching: isCategoriesFetching } =
    useFindCategoriesByProductQuery(selectedProductId || null);

  const selectedProduct = products.find(
    (product) => product.id === selectedProductId,
  );

  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId,
  );

  const hasChanges =
    selectedProductId !== currentProductId ||
    selectedCategoryId !== currentCategoryId;

  const isCategoryValid = categories.some(
    (category) => category.id === selectedCategoryId,
  );

  const canSave =
    Boolean(selectedProductId) &&
    Boolean(selectedCategoryId) &&
    isCategoryValid &&
    hasChanges &&
    !isPending;

  const handleProductChange = (productId: string) => {
    if (productId !== selectedProductId) {
      setSelectedProductId(productId);
      setSelectedCategoryId("");
    }

    setProductOpen(false);
    setCategoryOpen(false);
  };

  const handleSave = async () => {
    if (!canSave) return;

    await onSubmit({
      product: selectedProductId,
      category: selectedCategoryId,
    });

    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen && !isPending) {
          onClose();
        }
      }}
    >
      <DialogContent
        {...(!closeOnOutsideClick
          ? {
              onPointerDownOutside: (event) => {
                event.preventDefault();
              },
            }
          : {})}
        className="
          max-h-[90vh] gap-0 overflow-x-hidden overflow-y-auto
          rounded-[24px] border border-border/70 bg-card p-0
          shadow-[0_32px_80px_-32px_oklch(0.2_0.04_265/0.35)]
          sm:max-w-[540px]
        "
      >
        {/* Header */}
        <div
          className="
            border-b border-border/60
            bg-linear-to-br from-violet-500/10 to-transparent
            px-7 pb-6 pt-7 sm:px-8
          "
        >
          <DialogHeader className="text-left">
            <div className="flex items-start gap-3">
              <div
                className="
                  flex size-10 shrink-0 items-center justify-center
                  rounded-xl bg-violet-600 text-white shadow-sm
                "
              >
                <Settings2 className="size-[19px]" />
              </div>

              <div className="min-w-0 flex-1">
                <DialogTitle
                  className="
                    text-[22px] font-semibold leading-tight
                    tracking-[-0.025em]
                  "
                >
                  Zmień produkt i kategorię
                </DialogTitle>

                <DialogDescription
                  className="
                    mt-1.5 text-[13px] leading-5
                    text-muted-foreground
                  "
                >
                  Zaktualizuj przypisanie artykułu do produktu i jego kategorii.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="space-y-6 px-7 py-6 sm:px-8">
          {/* Product */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Package className="size-4 text-muted-foreground" />

              <label className="text-[13px] font-semibold text-foreground">
                Produkt
              </label>
            </div>

            <Popover open={productOpen} onOpenChange={setProductOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  role="combobox"
                  aria-expanded={productOpen}
                  disabled={isPending}
                  className="
                    h-12 w-full justify-between rounded-xl
                    border-border bg-background px-3
                    font-normal shadow-none
                    hover:bg-accent/40
                  "
                >
                  {selectedProduct ? (
                    <span className="flex min-w-0 items-center gap-3">
                      <span
                        className="
                          flex size-8 shrink-0 items-center
                          justify-center rounded-lg border
                        "
                        style={{
                          borderColor: selectedProduct.labelColor
                            ? `${selectedProduct.labelColor}35`
                            : undefined,
                          backgroundColor: selectedProduct.labelColor
                            ? `${selectedProduct.labelColor}12`
                            : undefined,
                        }}
                      >
                        <Package
                          className="size-4"
                          style={{
                            color: selectedProduct.labelColor,
                          }}
                        />
                      </span>

                      <span className="truncate text-sm font-medium text-foreground">
                        {selectedProduct.name}
                      </span>
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      Wybierz produkt...
                    </span>
                  )}

                  {isProductsFetching ? (
                    <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" />
                  ) : (
                    <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
                  )}
                </Button>
              </PopoverTrigger>

              <PopoverContent
                align="start"
                className="
                  w-(--radix-popper-anchor-width)
                  min-w-[280px] p-0
                "
                onWheel={(event) => event.stopPropagation()}
              >
                <Command>
                  <CommandInput placeholder="Wyszukaj produkt..." />

                  <CommandList className="max-h-64 overflow-y-auto scrollbar-custom">
                    <CommandEmpty>Nie znaleziono produktu.</CommandEmpty>

                    <CommandGroup className="p-1.5">
                      {products.map((product) => {
                        const isSelected = selectedProductId === product.id;

                        return (
                          <CommandItem
                            key={product.id}
                            value={product.name}
                            onSelect={() => handleProductChange(product.id)}
                            className="
                              flex cursor-pointer items-center gap-3
                              rounded-lg px-3 py-2.5
                            "
                          >
                            <span
                              className="
                                flex size-8 shrink-0 items-center
                                justify-center rounded-lg border
                              "
                              style={{
                                borderColor: product.labelColor
                                  ? `${product.labelColor}35`
                                  : undefined,
                                backgroundColor: product.labelColor
                                  ? `${product.labelColor}12`
                                  : undefined,
                              }}
                            >
                              <Package
                                className="size-4"
                                style={{
                                  color: product.labelColor,
                                }}
                              />
                            </span>

                            <span className="min-w-0 flex-1 truncate font-medium">
                              {product.name}
                            </span>

                            <Check
                              className={cn(
                                "size-4 shrink-0 text-primary transition-opacity",
                                isSelected ? "opacity-100" : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <p className="text-xs leading-5 text-muted-foreground">
              Wybierz produkt, którego dotyczy artykuł.
            </p>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FolderTree className="size-4 text-muted-foreground" />

              <label className="text-[13px] font-semibold text-foreground">
                Kategoria
              </label>
            </div>

            <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  role="combobox"
                  aria-expanded={categoryOpen}
                  disabled={
                    !selectedProductId || isCategoriesFetching || isPending
                  }
                  className="
                    h-12 w-full justify-between rounded-xl
                    border-border bg-background px-3
                    font-normal shadow-none
                    hover:bg-accent/40
                    disabled:opacity-60
                  "
                >
                  {selectedCategory ? (
                    <span className="flex min-w-0 items-center gap-3">
                      <span
                        className="
                          flex size-8 shrink-0 items-center
                          justify-center rounded-lg bg-muted
                          text-muted-foreground
                        "
                      >
                        <FolderTree className="size-4" />
                      </span>

                      <span className="truncate text-sm font-medium text-foreground">
                        {selectedCategory.name}
                      </span>
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      {!selectedProductId
                        ? "Najpierw wybierz produkt"
                        : isCategoriesFetching
                          ? "Ładowanie kategorii..."
                          : "Wybierz kategorię..."}
                    </span>
                  )}

                  {isCategoriesFetching ? (
                    <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" />
                  ) : (
                    <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
                  )}
                </Button>
              </PopoverTrigger>

              <PopoverContent
                align="start"
                className="
                  w-(--radix-popper-anchor-width)
                  min-w-[280px] p-0
                "
                onWheel={(event) => event.stopPropagation()}
              >
                <Command>
                  <CommandInput placeholder="Wyszukaj kategorię..." />

                  <CommandList className="max-h-64 overflow-y-auto scrollbar-custom">
                    <CommandEmpty>
                      Nie znaleziono kategorii dla wybranego produktu.
                    </CommandEmpty>

                    <CommandGroup className="p-1.5">
                      {categories.map((category) => {
                        const isSelected = selectedCategoryId === category.id;

                        return (
                          <CommandItem
                            key={category.id}
                            value={category.name}
                            onSelect={() => {
                              setSelectedCategoryId(category.id);
                              setCategoryOpen(false);
                            }}
                            className="
                              flex cursor-pointer items-center gap-3
                              rounded-lg px-3 py-2.5
                            "
                          >
                            <span
                              className="
                                flex size-8 shrink-0 items-center
                                justify-center rounded-lg bg-muted
                                text-muted-foreground
                              "
                            >
                              <FolderTree className="size-4" />
                            </span>

                            <span className="min-w-0 flex-1 truncate font-medium">
                              {category.name}
                            </span>

                            <Check
                              className={cn(
                                "size-4 shrink-0 text-primary transition-opacity",
                                isSelected ? "opacity-100" : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <p className="text-xs leading-5 text-muted-foreground">
              Dostępne kategorie są pobierane na podstawie wybranego produktu.
            </p>
          </div>

          {/* Information */}
          <div
            className="
              flex items-start gap-2.5 rounded-xl
              bg-muted/50 px-4 py-3
            "
          >
            <Info className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

            <p className="text-xs leading-5 text-muted-foreground">
              Zmiana produktu powoduje wyczyszczenie wybranej kategorii.
              Następnie należy wskazać kategorię dostępną dla nowego produktu.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div
          className="
            flex justify-end gap-3 border-t border-border/60
            bg-muted/20 px-7 py-5 sm:px-8
          "
        >
          <Button
            type="button"
            variant="ghost"
            size="lg"
            className="rounded-xl"
            disabled={isPending}
            onClick={onClose}
          >
            Anuluj
          </Button>

          <Button
            type="button"
            size="lg"
            className="min-w-[145px] rounded-xl px-6"
            disabled={!canSave}
            onClick={handleSave}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Zapisywanie...
              </>
            ) : (
              "Zapisz zmiany"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
