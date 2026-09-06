import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { ConfirmDialog } from "../../../../../../components/shared/ConfirmDialog";

import type { AxiosError } from "axios";
import { useDeleteWorkspaceMember } from "../../../../../../hooks/workspace-members/actions/delete";
import { useTransferWorkspaceOwnership } from "../../../../../../hooks/workspace-members/actions/transferOwnership";
import { useUpdateWorkspaceMemberPermissions } from "../../../../../../hooks/workspace-members/actions/updatePermissions";
import type {
  IWorkspaceMemberInfo,
  MemberModalType,
} from "../hooks/useMemberModal";
import { EditMemberPermissionsModal } from "../modals/EditMemberPermissionsModal";
import { PromoteMemberModal } from "../modals/PromoteMemberModal";

interface Props {
  type: MemberModalType;
  isOpen: boolean;
  onClose: () => void;
  member: IWorkspaceMemberInfo | null;
}

export default function ModalsSection({
  type,
  isOpen,
  onClose,
  member,
}: Props) {
  const { id: workspaceId } = useParams<{ id: string }>();

  const { updatePermissions } = useUpdateWorkspaceMemberPermissions();
  const { transferWorkspaceOwnership, isTransferOwnershipPending } =
    useTransferWorkspaceOwnership();
  const { deleteWorkspaceMember, isDeletePending } = useDeleteWorkspaceMember();

  //   ----- ADD ------
  const onAdd = async (userIds: string[]) => {
    if (!workspaceId) {
      throw new Error("Workspace ID is missing");
    }

    // await addMembers(workspaceId, userIds);

    onClose();
    toast.success("Dodano nowych członków do kolekcji");
  };

  // ---- PROMOTE ----
  const onPromote = async (memberId: string) => {
    if (!workspaceId) {
      throw new Error("Worksapce ID is missing");
    }
    try {
      await transferWorkspaceOwnership(workspaceId, memberId);
      onClose();
      return;
    } catch (error) {
      const { status } = error as AxiosError;

      if (status === 403) {
        toast.error("Brak uprawnień", {
          description:
            "Tylko właściciel kolekcji może zmienić jej właściciela.",
        });
        onClose();
        return;
      }
      onClose();
      toast.error("Wystapił błąd");
    }

    toast.success("Zmieniono właściciela kolekcji");
  };

  // ------ update permissions ---
  const onUpdatePermissions = async (
    memberId: string,
    permissions: IWorkspaceMemberInfo["permissions"],
  ) => {
    if (!workspaceId || !member) {
      throw new Error("Missing required data");
    }

    try {
      await updatePermissions(workspaceId, memberId, permissions);
      onClose();
      toast.success("Uprawnienia zostały zaktualizowane");
    } catch (error) {
      const { status } = error as AxiosError;

      if (status === 403) {
        toast.error("Brak uprawnień", {
          description:
            "Tylko właściciel kolekcji może zarządzać uprawnieniami jej członków.",
        });
        onClose();
        return;
      }

      onClose();
      toast.error("Nie udało się zaktualizować uprawnień", {
        description: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie.",
      });
    }
  };

  // ------ delete member -------
  const onDelete = async () => {
    if (!workspaceId || !member) {
      throw new Error("Missing required data");
    }

    try {
      await deleteWorkspaceMember(workspaceId, member.memberId);

      onClose();
      toast.success("Członek został usunięty z kolekcji");
    } catch (error) {
      const { status } = error as AxiosError;

      if (status === 403) {
        toast.error("Brak uprawnień", {
          description:
            "Usuwanie członków jest dostępne tylko dla właściciela kolekcji.",
        });
        onClose();
        return;
      }
      onClose();
      toast.error("Wystapił błąd");
    }
  };

  if (!type) {
    return null;
  }

  switch (type) {
    // case "addMember":
    //   return (
    //     <AddWorkspaceMemberModal
    //       isOpen={isOpen}
    //       onClose={onClose}
    //       onSave={onAdd}
    //       isPending={false}
    //     />
    //   );

    case "editMember":
      if (!member) {
        return null;
      }

      return (
        <EditMemberPermissionsModal
          isOpen={isOpen}
          member={member}
          onClose={onClose}
          onSave={onUpdatePermissions}
          isPending={false}
        />
      );

    case "promoteMember":
      if (!member) {
        return null;
      }

      return (
        <PromoteMemberModal
          isOpen={isOpen}
          member={member}
          onClose={onClose}
          onConfirm={onPromote}
          isPending={isTransferOwnershipPending}
        />
      );

    case "deleteMember":
      if (!member) {
        return null;
      }

      return (
        <ConfirmDialog
          isOpen={isOpen}
          title="Usunąć członka?"
          type="warning"
          onCancel={onClose}
          onConfirm={onDelete}
          requireConfirmation
          isConfirmEnabled
          isLoading={false}
        >
          Czy na pewno chcesz usunąć{" "}
          <b>
            {member.name} {member.surname}
          </b>{" "}
          z kolekcji?
          <br />
          Utraci on dostęp do jej zawartości.
        </ConfirmDialog>
      );
  }
}
