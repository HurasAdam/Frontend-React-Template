import API from "../../config/api.config";
import type { AuthUserData } from "./auth.types";

const BASE_URL = "api/auth";

const login = (data: { email: string; password: string }) => {
  return API.post(`${BASE_URL}/login`, data);
};

const verifyMe = (): Promise<AuthUserData> => {
  return API.get(`${BASE_URL}/me`);
};

const logout = () => {
  return API.get(`${BASE_URL}/logout`);
};

const changePassword = (payload: {
  currentPassword: string;
  newPassword: string;
}) => {
  return API.patch(`${BASE_URL}/change-password`, payload);
};

export const authService = {
  login,
  verifyMe,
  logout,
  changePassword,
};
