import { Route } from "react-router-dom";
import { AdminLayout } from "../../layouts/AdminLayout";

import { AdminDashboardPage } from "../../pages/admin/dashboard/view/AdminDashboardPage";
import { UsersPage } from "../../pages/admin/users/views/UsersPage";

export const AdminRoutes = (
  <Route element={<AdminLayout />}>
    <Route path="/admin" element={<AdminDashboardPage />} />
    <Route path="/admin/users" element={<UsersPage />} />
  </Route>
);
