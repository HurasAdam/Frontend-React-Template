import { PageContainer } from "../../../../components/shared/PageContainer";
import { AddProductModal } from "../../../../features/products/components/AddProductModal";
import { useProductModal } from "../../../../features/products/hooks/useProductModal";
import { ProductsPage } from "./ProductsPage";

export const ProductsLayout = () => {
  const modal = useProductModal();
  return (
    <PageContainer variant="full">
      <ProductsPage openAdd={modal.openAdd} />

      <AddProductModal isOpen={modal.isOpen} onClose={modal.close} />
    </PageContainer>
  );
};
