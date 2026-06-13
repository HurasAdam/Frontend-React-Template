import { PageContainer } from "../../../../components/shared/PageContainer";
import { AddUsefullLinkCategoryModal } from "../../../../features/usefull-link-categories/components/AddUsefullLinkCategoryModal";
import { useUsefullLinkCategoryModal } from "../../../../features/usefull-link-categories/hooks/useUsefullLinkCategoryModal";
import { ImportantLinksPage } from "./ImportantLinksPage";

export const ImportantLinksLayout = () => {
  const { isCreate, close, openAdd } = useUsefullLinkCategoryModal();

  return (
    <PageContainer variant="wide">
      <ImportantLinksPage openAddCategory={openAdd} />

      <AddUsefullLinkCategoryModal isOpen={isCreate} onClose={close} />
    </PageContainer>
  );
};
