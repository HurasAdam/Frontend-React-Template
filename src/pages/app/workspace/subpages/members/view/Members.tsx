import { useOutletContext, useParams } from "react-router-dom";
import { Separator } from "../../../../../../components/ui/separator";
import { useFindMembersByWorkspaceQuery } from "../../../../../../hooks/workspace-members/queries/use-workspace-members.queries";
import WorkspaceInviteLinkSection from "../components/InviteCodeSection";
import { MembersHeader } from "../components/MembersHeader";
import { MembersSection } from "../components/MembersSection";

export const Members = () => {
  const permissions = { addMember: true };
  const { workspaceId } = useParams();
  const { id, isLoading } = useParams();
  const { data: members } = useFindMembersByWorkspaceQuery(id);
  const { workspace } = useOutletContext();

  return (
    <>
      <MembersHeader permissions={permissions} />
      <Separator />
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
