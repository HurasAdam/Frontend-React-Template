import { LayoutDashboard, Users } from "lucide-react";

import { useNavigate, useOutletContext } from "react-router-dom";
import { PageContainer } from "../../../../../../components/shared/PageContainer";
import { TopBar } from "../../../../../../components/topbar/workspace-topbar";
import type { WorkspaceContext } from "../../settings/view/Settings";
import { Members } from "./Members";

export const MembersLayout = () => {
  const { workspace } = useOutletContext<WorkspaceContext>();
  const navigate = useNavigate();
  const handleAddMember = () => {
    // otwarcie modala
  };

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
            label: "Zarządzanie członkami",
            icon: Users,
            iconClassName: "text-blue-500",
          },
        ]}
        containerVariant="wide"
        onBack={() => navigate(`/workspace/${workspace.id}`)}
        workspaceId={workspace.id}
      />
      <PageContainer variant="wide">
        <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Members />
        </div>
      </PageContainer>
    </>
  );
};
