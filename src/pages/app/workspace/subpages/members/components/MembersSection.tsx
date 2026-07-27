import { useState } from "react";
import { WorkspaceMembersList } from "./MembersList";

export interface WorkspaceMember {
  _id: string;
  name: string;
  surname: string;
  email: string;
  isOwner: boolean;
  permissions: Record<string, boolean>;
}

interface WorkspaceMembersSectionProps {
  isLoading: boolean;
  workspaceMembers: WorkspaceMember[];
  workspaceId: string;
  permissions: Record<string, boolean>;
}

export const MembersSection = ({
  isLoading,
  workspaceMembers,
  workspaceId,
  permissions,
}: WorkspaceMembersSectionProps) => {
  const [memberToRemove, setMemberToRemove] = useState<WorkspaceMember | null>(
    null,
  );
  const [memberToPromote, setMemberToPromote] =
    useState<WorkspaceMember | null>(null);
  const [selectedMember, setSelectedMember] = useState<WorkspaceMember | null>(
    null,
  );

  const handleConfirmRemove = () => {
    if (!memberToRemove) return;
  };

  const handleConfirmPromote = () => {
    if (!memberToPromote) return;
  };

  const handleCancelRemove = () => setMemberToRemove(null);
  const handleCancelEdit = () => setSelectedMember(null);
  const handleCancelPromote = () => setMemberToPromote(null);
  return (
    <section>
      <h2 className="text-sm font-medium text-muted-foreground mb-3">
        Lista użytkowników
      </h2>

      <WorkspaceMembersList
        workspaceMembers={workspaceMembers}
        isLoading={isLoading}
        workspaceId={workspaceId}
        onRequestRemove={setMemberToRemove}
        onRequestPromote={setMemberToPromote}
        onRequestEdit={setSelectedMember}
        permissions={permissions}
      />
    </section>
  );
};
