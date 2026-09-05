import { useState } from "react";

export type MemberModalType =
  | "addMember"
  | "editMember"
  | "deleteMember"
  | "promoteMember"
  | null;

export interface IWorkspaceMemberInfo {
  memberId: string;
  userId: string;
  name: string;
  surname: string;
  email: string;
  isOwner: boolean;
  permissions: {
    addFolder: boolean;
    editFolder: boolean;
    deleteFolder: boolean;
    addArticle: boolean;
    editArticle: boolean;
    deleteArticle: boolean;
    addMember: boolean;
    removeMember: boolean;
    editWorkspace: boolean;
  };
}

export function useMemberModal() {
  const [type, setType] = useState<MemberModalType>(null);
  const [member, setMember] = useState<IWorkspaceMemberInfo | null>(null);

  const openAddMember = () => {
    setType("addMember");
    setMember(null);
  };

  const openEditMember = (member: IWorkspaceMemberInfo) => {
    setType("editMember");
    setMember(member);
  };

  const openDeleteMember = (member: IWorkspaceMemberInfo) => {
    setType("deleteMember");
    setMember(member);
  };

  const openPromoteMember = (member: IWorkspaceMemberInfo) => {
    setType("promoteMember");
    setMember(member);
  };

  const closeModal = () => {
    setType(null);
    setMember(null);
  };

  return {
    type,
    member,
    isOpen: type !== null,

    openAddMember,
    openEditMember,
    openDeleteMember,
    openPromoteMember,

    closeModal,
  };
}
