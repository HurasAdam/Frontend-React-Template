import { zodResolver } from "@hookform/resolvers/zod";
import { FilePlus2, Loader } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAddArticle } from "../../../../hooks/articles/actions/add";
import { useFindCategoriesByProductQuery } from "../../../../hooks/product-categories/queries/use-product-categories.queries";
import { useFindProductsQuery } from "../../../../hooks/products/queries/use-products.queries";
import { useFindTagsQuery } from "../../../../hooks/tags/queries/use-tags.queries";
import {
  mapToSelectOptions,
  mapToSelectProductOptions,
} from "../../../../lib/form-mappers";
import {
  createArticleSchema,
  type CreateArticlePayload,
} from "../../../../validation/articles/create-article.schema";
import { AddArticleForm } from "../components/AddArticleForm";

export type SelectOption = {
  label: string;
  value: string;
};

export function NewArticlePage() {
  const navigate = useNavigate();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );

  const { data: products = [] } = useFindProductsQuery({});

  const { data: categories = [] } =
    useFindCategoriesByProductQuery(selectedProductId);

  const { data: tags = [] } = useFindTagsQuery({ name: "" });

  const { addArticle, isAddPending } = useAddArticle();

  const formattedProducts: SelectOption[] = mapToSelectProductOptions(
    products,
    (p) => p.name,
    (p) => p.id,
    (p) => p.labelColor,
  );

  const formattedCategoriesBySelectedProduct: SelectOption[] =
    mapToSelectOptions(
      categories,
      (c) => c.name,
      (c) => c.id,
    );

  const form = useForm<CreateArticlePayload>({
    resolver: zodResolver(createArticleSchema),
    defaultValues: {
      title: "",
      internalNote: "",
      product: "",
      category: "",
      responseTemplates: [
        {
          version: 1,
          variantName: "",
          variantContent: "",
        },
      ],
    },
    mode: "onChange",
  });

  const onSave = async (data: CreateArticlePayload) => {
    try {
      await addArticle(data);
      toast.success("Dodano nowy artykuł");
      navigate("/articles");
      return;
    } catch (error) {
      const { status } = error as AxiosError;

      if (status === 403) {
        toast.error("Brak uprawnien", {
          description: "Nie ma uprawnień do dodawania artykułów",
        });
        return;
      }

      toast.error("Wystapił błąd");
      return;
    }
  };

  const handleSubmit = form.handleSubmit(onSave, (errors) => {
    console.log("FORM ERRORS:", errors);
  });

  return (
    <>
      {/* ============================================================
          PAGE HEADER
      ============================================================ */}
      <header className="mb-7">
        <div className="flex items-end justify-between gap-6">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-card">
                <FilePlus2 className="size-5 text-muted-foreground" />
              </div>

              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Nowy artykuł
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                  Utwórz nowy artykuł i przygotuj odpowiedź dla użytkowników.
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================
              DESKTOP HEADER ACTIONS
          ======================================================== */}
          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => {}}
              disabled={isAddPending}
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg border bg-background px-4 text-sm font-medium shadow-sm transition-all hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
            >
              Anuluj
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isAddPending}
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
            >
              {isAddPending ? (
                <>
                  <Loader className="size-4 animate-spin" />
                  Zapisuję...
                </>
              ) : (
                "Zapisz artykuł"
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================
          FORM
      ============================================================ */}
      <FormProvider {...form}>
        <AddArticleForm
          categories={formattedCategoriesBySelectedProduct}
          products={formattedProducts}
          tags={tags}
          onProductChange={setSelectedProductId}
        />
      </FormProvider>

      {/* ============================================================
          DESKTOP / BOTTOM ACTIONS
      ============================================================ */}
      <div className="mt-4 hidden border-t px-5 pb-6 pt-4 sm:block">
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => {}}
            disabled={isAddPending}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg border bg-background px-4 text-sm font-medium shadow-sm transition-all hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
          >
            Anuluj
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isAddPending}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
          >
            {isAddPending ? (
              <>
                <Loader className="size-4 animate-spin" />
                Zapisuję...
              </>
            ) : (
              "Zapisz artykuł"
            )}
          </button>
        </div>
      </div>

      {/* ============================================================
          MOBILE / BOTTOM ACTION BAR
      ============================================================ */}
      <div className="sticky bottom-0 z-20 -mx-4 border-t bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:hidden">
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => {}}
            disabled={isAddPending}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg border bg-background px-4 text-sm font-medium shadow-sm transition-all hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
          >
            Anuluj
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isAddPending}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
          >
            {isAddPending ? (
              <>
                <Loader className="size-4 animate-spin" />
                Zapisuję...
              </>
            ) : (
              "Zapisz"
            )}
          </button>
        </div>
      </div>
    </>
  );
}
