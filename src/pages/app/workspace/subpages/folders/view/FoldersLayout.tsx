import { FolderCog, LayoutDashboard } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { PageContainer } from "../../../../../../components/shared/PageContainer";
import { TopBar } from "../../../../../../components/topbar/workspace-topbar";
import type { WorkspaceContext } from "../../settings/view/Settings";
import ModalsSection from "../components/ModalsSection";
import { useFolderModal } from "../hooks/useFolderModal";
import { Folders } from "./Folders";

export const FoldersLayout = () => {
  const { workspace } = useOutletContext<WorkspaceContext>();
  const folderModal = useFolderModal();
  const navigate = useNavigate();

  return (
    <>
      <TopBar
        rootBreadcrumb={{
          label: "Tablica",
          href: `/workspace/${workspace.id}`,
          icon: LayoutDashboard,
          iconClassName: "text-muted-foreground",
        }}
        breadcrumbs={[
          {
            label: "Zarządzanie folderami",
            icon: FolderCog,
            iconClassName: "text-amber-500",
          },
        ]}
        containerVariant="wide"
        onBack={() => navigate(-1)}
        workspaceId={workspace.id}
      />

      <PageContainer variant="wide">
        <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <Folders folderModal={folderModal} />
        </div>
      </PageContainer>

      <ModalsSection
        isOpen={folderModal.isOpen}
        type={folderModal.type}
        onClose={folderModal.close}
        folder={folderModal.folder}
      />
    </>
  );
};
