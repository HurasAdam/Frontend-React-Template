import { Permissions } from "./permissions";

export const PERMISSION_GROUPS = {
  Articles: [
    Permissions.ADD_ARTICLE,
    Permissions.EDIT_ARTICLE,
    Permissions.DELETE_ARTICLE,
  ],

  Products: [
    Permissions.ADD_PRODUCT,
    Permissions.EDIT_PRODUCT,
    Permissions.DELETE_PRODUCT,
  ],

  Admin: [Permissions.ACCESS_ADMIN_PANEL],
} as const;
