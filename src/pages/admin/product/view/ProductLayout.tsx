import { useNavigate } from "react-router-dom";
import { PageContainer } from "../../../../components/shared/PageContainer";
import { AddProductCategoryModal } from "../../../../features/products/components/AddProductCategoryModal";
import { EditProductCategoryModal } from "../../../../features/products/components/EditProductCategoryModal";
import { useProductCategoryModal } from "../../../../features/products/hooks/useProductCategoryModal";
import { ProductPage } from "./ProductPage";

export const ProductLayout = () => {
  const navigate = useNavigate();
  const modal = useProductCategoryModal();

  const onBack = () => {
    navigate("/admin/products");
  };

  return (
    <PageContainer variant="full">
      <ProductPage
        onBack={onBack}
        openAddProductCategory={modal.openAddProductCategory}
        openEditProductCategory={modal.openEditProductCategory}
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
    </PageContainer>
  );
};
