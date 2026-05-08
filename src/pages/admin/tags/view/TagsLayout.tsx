import { PageContainer } from "../../../../components/shared/PageContainer";
import { AddTagModal } from "../../../../features/tags/components/AddTagModal";
import { useTagModal } from "../../../../features/tags/hooks/useTagModal";
import { TagsPage } from "./TagsPage";

export const TagsLayout = () => {
  const modal = useTagModal();
  return (
    <PageContainer variant="full">
      <TagsPage openAdd={modal.openAdd} />
      <AddTagModal isOpen={modal.isOpen} onClose={modal.close} />
    </PageContainer>
  );
};
