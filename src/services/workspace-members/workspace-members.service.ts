import API from "../../config/api.config";

const BASE_URL = "/api/workspace-members";

const add = (payload: unknown) => {
  return API.post(`${BASE_URL}`, payload);
};

const findByWorkspaceId = (workspaceId: string) => {
  return API.get(`${BASE_URL}/${workspaceId}/members`);
};

const findAvailableByWorkspaceId = (workspaceId: string) => {
  return API.get(`${BASE_URL}/${workspaceId}/members/available`);
};

const deleteOne = (workspaceId: string, memberId: string) => {
  return API.delete(`${BASE_URL}/${workspaceId}/members/${memberId}`);
};

const transferOwnership = (workspaceId: string, memberId: string) => {
  return API.patch(`${BASE_URL}/${workspaceId}/owner/${memberId}`);
};

const updatePermissions = (
  workspaceId: string,
  memberId: string,
  permissions: unknown,
) => {
  return API.patch(
    `${BASE_URL}/${workspaceId}/members/${memberId}/permissions`,
    { permissions },
  );
};

export const workspaceMembersService = {
  add,
  findByWorkspaceId,
  findAvailableByWorkspaceId,
  deleteOne,
  transferOwnership,
  updatePermissions,
};
