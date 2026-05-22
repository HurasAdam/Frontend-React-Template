import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ConfirmDialog } from "../../../../components/shared/ConfirmDialog";
import { useConfirmDialog } from "../../../../components/shared/hooks/useConfirmDialog";
import { PageContainer } from "../../../../components/shared/PageContainer";
import queryClient from "../../../../config/query.config";
import { AddProductCategoryModal } from "../../../../features/products/components/AddProductCategoryModal";
import { AddProductTopicModal } from "../../../../features/products/components/AddProductTopicModal";
import { EditProductCategoryModal } from "../../../../features/products/components/EditProductCategoryModal";
import { EditProductTopicModal } from "../../../../features/products/components/EditProductTopicModal";
import { useProductCategoryModal } from "../../../../features/products/hooks/useProductCategoryModal";
import { useProductTopicModal } from "../../../../features/products/hooks/useProductTopicModal";
import { useDeleteProductCategoryMutate } from "../../../../hooks/product-categories/use-product-categories";
import type { IProductCategory } from "../../../../services/product-category/product-category.types";
import { ProductPage } from "./ProductPage";

export const ProductLayout = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const modal = useProductCategoryModal();
  const topicModal = useProductTopicModal();
  const confirmDialog = useConfirmDialog();

  const { mutate: deleteMutate, isPending: isDeletePending } =
    useDeleteProductCategoryMutate();

  const handleDeleteCategory = (cat: IProductCategory) => {
    confirmDialog.open({
      title: "Czy jesteś pewien ?",
      type: "warning",
      description: (
        <>
          <p>
            Czy na pewno chcesz usunąć kategorię <b>{cat.name}</b>?
          </p>
          <p className="text-sm text-muted-foreground">
            Zostanie{" "}
            <span className="text-rose-700/95 font-medium">usunięta</span> z
            produktu i nie będzie już dostępna.
          </p>
        </>
      ),
      data: cat,
      onConfirm: (cat) =>
        deleteMutate(cat.id, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["product", productId] });
            toast.success(`Kategoria ${cat.name} została usunięta  `, {
              position: "bottom-right",
            });
            confirmDialog.close();
          },
        }),
    });
  };

  const onBack = () => {
    navigate("/admin/products");
  };

  return (
    <PageContainer variant="full">
      <ProductPage
        onBack={onBack}
        openAddProductCategory={modal.openAddProductCategory}
        openEditProductCategory={modal.openEditProductCategory}
        onDelete={handleDeleteCategory}
        openAddProductTopic={topicModal.openAddProductTopic}
        openEditProductTopic={topicModal.openEditProductTopic}
      />
      <AddProductCategoryModal
        isOpen={modal.isCreate}
        onClose={modal.close}
        product={modal.product}
      />

      {modal.isEdit && (
        <EditProductCategoryModal
          isOpen={modal.isEdit}
          onClose={modal.close}
          product={modal.product}
          categoryId={modal.categoryId}
        />
      )}

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        type={confirmDialog.type}
        onCancel={confirmDialog.close}
        onConfirm={confirmDialog.confirm}
        isLoading={isDeletePending}
        requireConfirmation={true}
        isConfirmEnabled={true}
      >
        {confirmDialog.description}
      </ConfirmDialog>

      {topicModal.isCreate && (
        <AddProductTopicModal
          isOpen={topicModal.isCreate}
          onClose={topicModal.close}
          product={topicModal.product}
        />
      )}

      {topicModal.isEdit && (
        <EditProductTopicModal
          isOpen={topicModal.isEdit}
          onClose={topicModal.close}
          product={topicModal.product}
          topicId={topicModal.topicId}
        />
      )}
    </PageContainer>
  );
};
