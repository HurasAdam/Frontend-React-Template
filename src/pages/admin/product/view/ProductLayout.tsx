import { useNavigate } from "react-router-dom";
import { PageContainer } from "../../../../components/shared/PageContainer";
import { ProductPage } from "./ProductPage";

export const ProductLayout = () => {
  const navigate = useNavigate();

  const onBack = () => {
    navigate("/admin/products");
  };
  return (
    <PageContainer variant="full">
      <ProductPage onBack={onBack} />
    </PageContainer>
  );
};
