import { Card } from "@/components/ui/card";

import { WorkspaceMemberCard } from "./MemberItem";
import type { WorkspaceMember } from "./MembersSection";

interface WorkspaceMembersListProps {
  isLoading: boolean;
  workspaceMembers: WorkspaceMember[];
  workspaceId: string;
  onRequestRemove: (member: WorkspaceMember) => void;
  onRequestPromote: (member: WorkspaceMember) => void;
  onRequestEdit: (member: WorkspaceMember) => void;
  permissions: Record<string, boolean>;
}

export const WorkspaceMembersList = ({
  workspaceMembers,
  isLoading,
  workspaceId,
  onRequestRemove,
  onRequestPromote,
  onRequestEdit,
  permissions,
}: WorkspaceMembersListProps) => {
  if (isLoading) {
    return (
      <p className="text-sm text-muted-foreground">
        Ładowanie listy użytkowników...
      </p>
    );
  }

  if (!workspaceMembers?.length) {
    return (
      <Card className="rounded-2xl border-border/70 bg-card p-6 text-center text-sm text-muted-foreground shadow-sm">
        Brak użytkowników do wyświetlenia.
      </Card>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="divide-y divide-border/70">
        {workspaceMembers.map((member) => (
          <WorkspaceMemberCard
            key={member._id}
            member={member}
            workspaceId={workspaceId}
            onRequestRemove={onRequestRemove}
            onRequestPromote={onRequestPromote}
            onRequestEdit={onRequestEdit}
            permissions={permissions}
          />
        ))}
      </div>
    </div>
  );
};
