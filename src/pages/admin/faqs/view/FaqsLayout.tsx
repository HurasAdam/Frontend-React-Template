import { useNavigate } from "react-router-dom";
import { PageContainer } from "../../../../components/shared/PageContainer";
import { FaqsPage } from "./FaqsPage";

const FaqsLayout = () => {
  const navigate = useNavigate();

  const openAdd = () => {
    navigate("/admin/faqs/new");
  };

  return (
    <PageContainer variant="full">
      <FaqsPage openAdd={openAdd} />
    </PageContainer>
  );
};

export default FaqsLayout;
