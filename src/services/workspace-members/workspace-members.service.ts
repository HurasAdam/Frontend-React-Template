import API from "../../config/api.config";

const BASE_URL = "/api/workspace-members";

const findByWorkspaceId = (workspaceId: string) => {
  return API.get(`${BASE_URL}/${workspaceId}/members`);
};

export const workspaceMembersService = {
  findByWorkspaceId,
};
