import { useNavigate } from "react-router-dom";
import { PageContainer } from "../../../../components/shared/PageContainer";
import { AddProductCategoryModal } from "../../../../features/products/components/AddProductCategoryModal";
import { useProductCategoryModal } from "../../../../features/products/hooks/useProductCategoryModal";
import { ProductPage } from "./ProductPage";

export const ProductLayout = () => {
  const navigate = useNavigate();
  const modal = useProductCategoryModal();

  const onBack = () => {
    navigate("/admin/products");
  };

  console.log("MODAL !", modal);
  return (
    <PageContainer variant="full">
      <ProductPage
        onBack={onBack}
        openAddProductCategory={modal.openAddProductCategory}
      />
      <AddProductCategoryModal
        isOpen={modal.isOpen}
        onClose={modal.close}
        product={modal.product}
      />
    </PageContainer>
  );
};
