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
  onRequestEdit,
  onRequestDelete,
  onRequestPromote,
}: WorkspaceMembersSectionProps) => {
  return (
    <section>
      <h2 className="text-sm font-medium text-muted-foreground mb-3">
        Lista użytkowników
      </h2>

      <WorkspaceMembersList
        workspaceMembers={workspaceMembers}
        isLoading={isLoading}
        workspaceId={workspaceId}
        onRequestRemove={onRequestDelete}
        onRequestPromote={onRequestPromote}
        onRequestEdit={onRequestEdit}
        permissions={permissions}
      />
    </section>
  );
};
