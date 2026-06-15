import { PageContainer } from "../../../../components/shared/PageContainer";
import { AddUsefullLinkCategoryModal } from "../../../../features/usefull-link-categories/components/AddUsefullLinkCategoryModal";
import { useUsefullLinkCategoryModal } from "../../../../features/usefull-link-categories/hooks/useUsefullLinkCategoryModal";
import { AddUsefulLinkModal } from "../../../../features/usefull-links/components/AddUsefullLinkModal";
import { UsefullLinkInfoModal } from "../../../../features/usefull-links/components/UsefullLinkInfoModal";
import { useUsefullLinkModal } from "../../../../features/usefull-links/hooks/useUsefullLinkModal";
import { ImportantLinksPage } from "./ImportantLinksPage";

export const ImportantLinksLayout = () => {
  const linkModal = useUsefullLinkModal();
  const categoryModal = useUsefullLinkCategoryModal();

  return (
    <PageContainer variant="wide">
      <ImportantLinksPage
        openAddLink={linkModal.openAdd}
        openLinkInfo={linkModal.openInfo}
        openAddCategory={categoryModal.openAdd}
      />

      <AddUsefullLinkCategoryModal
        isOpen={categoryModal.isCreate}
        onClose={categoryModal.close}
      />
      <AddUsefulLinkModal
        isOpen={linkModal.isCreate}
        onClose={linkModal.close}
      />

      <UsefullLinkInfoModal
        isOpen={linkModal.isInfo}
        onClose={linkModal.close}
        tag={linkModal.tag}
      />
    </PageContainer>
  );
};
