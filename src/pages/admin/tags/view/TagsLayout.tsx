import { PageContainer } from "../../../../components/shared/PageContainer";
import { AddTagModal } from "../../../../features/tags/components/AddTagModal";
import { EditTagModal } from "../../../../features/tags/components/EditTagModal";
import { TagInfoModal } from "../../../../features/tags/components/TagInfoModal";
import { useTagModal } from "../../../../features/tags/hooks/useTagModal";
import { TagsPage } from "./TagsPage";

export const TagsLayout = () => {
  const modal = useTagModal();

  return (
    <PageContainer variant="full">
      <TagsPage
        openAdd={modal.openAdd}
        openEdit={modal.openEdit}
        openInfo={modal.openInfo}
      />
      <AddTagModal isOpen={modal.isCreate} onClose={modal.close} />
      <EditTagModal
        isOpen={modal.isEdit}
        onClose={modal.close}
        tagId={modal.tagId}
      />
      <TagInfoModal
        isOpen={modal.isInfo}
        onClose={modal.close}
        tag={modal.tag}
      />
    </PageContainer>
  );
};
