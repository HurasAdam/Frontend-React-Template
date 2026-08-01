export type IFolderFormData = {
  name: string;
  description: string;
};

export type IAddFolderPayload = {
  workspaceId: string;
  payload: IFolderFormData;
};

export type IUpdateFolderPayload = {
  folderId: string;
  payload: IFolderFormData;
};
