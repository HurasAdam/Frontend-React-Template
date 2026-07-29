import { Plus, Users } from "lucide-react";
import { useOutletContext, useParams } from "react-router-dom";
import { Button } from "../../../../../../components/ui/button";
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

  return (
    <>
      <PageHeader
        title="Użytkownicy"
        description="Zarządzaj użytkownikami kolekcji."
        icon={Users}
        actions={
          <Button onClick={() => {}}>
            <Plus className="h-4 w-4" />
            Dodaj użytkownika
          </Button>
        }
      />

      {/* INVITE CODE SECTION */}

      {workspace && (
        <WorkspaceInviteLinkSection inviteCode={workspace.inviteCode} />
      )}

      {/* MEMBERS LIST SECTION */}
      <MembersSection
        workspaceMembers={members}
        workspaceId={workspaceId}
        isLoading={isLoading}
        permissions={permissions}
      />
    </>
  );
};
