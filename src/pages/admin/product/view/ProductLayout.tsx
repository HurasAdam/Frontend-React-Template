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

import { useDeleteProductCategoryMutate } from "../../../../hooks/product-categories/mutations/use-product-categories.mutations";
import { useDeleteOneProductTopicMutation } from "../../../../hooks/product-topics/mutations/use-product-topic-mutations";
import type { IProductCategory } from "../../../../services/product-category/product-category.types";
import { ProductPage } from "./ProductPage";

export const ProductLayout = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const modal = useProductCategoryModal();
  const topicModal = useProductTopicModal();
  const deleteCategoryDialog = useConfirmDialog();
  const deleteTopicDialog = useConfirmDialog();

  const { mutate: deleteMutate, isPending: isDeletePending } =
    useDeleteProductCategoryMutate();

  const { mutate: deleteTopicMutate, isPending: isDeleteTopicPending } =
    useDeleteOneProductTopicMutation();

  const handleDeleteCategory = (cat: IProductCategory) => {
    deleteCategoryDialog.open({
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
            deleteCategoryDialog.close();
          },
        }),
    });
  };

  const handleDeleteTopic = (cat: IProductCategory) => {
    deleteTopicDialog.open({
      title: "Czy jesteś pewien ?",
      type: "warning",
      description: (
        <>
          <p className="mb-3">
            Czy na pewno chcesz usunąć temat kontaktu <b>{cat.name}</b>?
          </p>

          <p className="text-sm text-muted-foreground  ">
            Po zatwierdzeniu tematu zostanie{" "}
            <span className="text-rose-700/95 font-medium">usunięty</span> z
            produktu i nie będzie już dostępny.
          </p>
        </>
      ),
      data: cat,
      onConfirm: (cat) =>
        deleteTopicMutate(cat.id, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["product", productId] });
            toast.success(`Temat ${cat.name} został usunięty  `, {
              position: "bottom-right",
            });
            deleteTopicDialog.close();
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
        onDeleteTopic={handleDeleteTopic}
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

      <ConfirmDialog
        isOpen={deleteCategoryDialog.isOpen}
        title={deleteCategoryDialog.title}
        type={deleteCategoryDialog.type}
        onCancel={deleteCategoryDialog.close}
        onConfirm={deleteCategoryDialog.confirm}
        isLoading={isDeletePending}
        requireConfirmation={true}
        isConfirmEnabled={true}
      >
        {deleteCategoryDialog.description}
      </ConfirmDialog>

      <ConfirmDialog
        isOpen={deleteTopicDialog.isOpen}
        title={deleteTopicDialog.title}
        type={deleteTopicDialog.type}
        onCancel={deleteTopicDialog.close}
        onConfirm={deleteTopicDialog.confirm}
        isLoading={isDeletePending}
        requireConfirmation={true}
        isConfirmEnabled={true}
      >
        {deleteTopicDialog.description}
      </ConfirmDialog>
    </PageContainer>
  );
};
