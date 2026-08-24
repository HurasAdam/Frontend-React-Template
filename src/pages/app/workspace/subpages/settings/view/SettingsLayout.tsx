import { LayoutDashboard, SettingsIcon } from "lucide-react";

import { useNavigate, useOutletContext } from "react-router-dom";
import { PageContainer } from "../../../../../../components/shared/PageContainer";
import { TopBar } from "../../../../../../components/topbar/workspace-topbar";
import { Settings, type WorkspaceContext } from "./Settings";

export const SettingsLayout = () => {
  const { workspace } = useOutletContext<WorkspaceContext>();
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
            label: "Ustawienia kolekcji",
            icon: SettingsIcon,
            iconClassName: "text-violet-500",
          },
        ]}
        containerVariant="wide"
        onBack={() => navigate(`/workspace/${workspaceId}`)}
        workspaceId={workspace.id}
      />

      <PageContainer variant="wide">
        <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Settings />
        </div>
      </PageContainer>
    </>
  );
};
