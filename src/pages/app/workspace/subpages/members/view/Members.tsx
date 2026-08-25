import { Plus, Users } from "lucide-react";
import { useOutletContext, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useFindMembersByWorkspaceQuery } from "../../../../../../hooks/workspace-members/queries/use-workspace-members.queries";

import PageHeader from "../../settings/components/PageHeader";
import WorkspaceInviteLinkSection from "../components/InviteCodeSection";
import { MembersSection } from "../components/MembersSection";

export const Members = () => {
  const permissions = { addMember: true };

  const { workspaceId } = useParams();
  const { id, isLoading } = useParams();
  const { data: members } = useFindMembersByWorkspaceQuery(id);
  const { workspace } = useOutletContext();

  const handleAddMember = () => {
    // otwarcie modala
  };

  return (
    <>
      <PageHeader
        title="Dostęp i uprawnienia"
        description="Zarządzaj dostępem i uprawnieniami kolekcji"
        icon={Users}
        actions={
          <Button onClick={handleAddMember}>
            <Plus className="size-4" />
            Dodaj użytkownika
          </Button>
        }
      />

      {workspace && (
        <WorkspaceInviteLinkSection inviteCode={workspace.inviteCode} />
      )}

      <MembersSection
        workspaceMembers={members}
        workspaceId={workspaceId}
        isLoading={isLoading}
        permissions={permissions}
      />
    </>
  );
};
