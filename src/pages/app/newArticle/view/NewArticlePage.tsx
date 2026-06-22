import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../../../../components/ui/button";
import { useCreateArticleMutation } from "../../../../hooks/articles/mutations/use-articles.mutations";
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
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const { data: products = [] } = useFindProductsQuery({});
  const { data: categories = [] } =
    useFindCategoriesByProductQuery(selectedProductId);

  const { data: tags = [] } = useFindTagsQuery({});

  const { mutate, isPending: isCreateLoading } = useCreateArticleMutation();

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

  const onSave = (data: CreateArticlePayload) => {
    console.log(data);
    mutate(data);
  };

  const handleSubmit = form.handleSubmit(onSave);

  return (
    <>
      <FormProvider {...form}>
        <AddArticleForm
          categories={formattedCategoriesBySelectedProduct}
          products={formattedProducts}
          tags={[]}
          onProductChange={setSelectedProductId}
        />
      </FormProvider>

      <div className="border-t mt-3.5 py-4 px-6 flex justify-end gap-3 max-w-[1380px] mx-auto w-full z-10">
        <Button variant="outline" onClick={() => {}}>
          Anuluj
        </Button>
        <Button
          variant="default"
          onClick={handleSubmit}
          disabled={isCreateLoading}
        >
          {isCreateLoading ? (
            <div className="flex items-center gap-2">
              <Loader className="animate-spin w-4 h-4" />
              Zapisuję...
            </div>
          ) : (
            "Zapisz"
          )}
        </Button>
      </div>
    </>
  );
}
