import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { BaseLayout } from "../../layouts/BaseLayout";
import { ImportantLinksPage } from "../../pages/app/important-links/views/ImportantLinksPage";
import { SettingsPage } from "../../pages/app/settings/view/SettingsPage";

import { AdminLayout } from "../../layouts/AdminLayout";
import { AdminsPage } from "../../pages/admin/admins/view/AdminsPage";
import { AdminDashboardPage } from "../../pages/admin/dashboard/view/AdminDashboardPage";
import { ProductLayout } from "../../pages/admin/product/view/ProductLayout";
import { ProductsLayout } from "../../pages/admin/products/view/ProductsLayout";
import { UsersPage } from "../../pages/admin/users/views/UsersPage";
import { ArticlesLayout } from "../../pages/app/articles/view/ArticlesLayout";
import { DashboardLayout } from "../../pages/app/dashboard/view/DashboardLayout";
import LoginPage from "../../pages/shared/auth/login/view/Login.page";
import { AdminRoute } from "../auth/admin.route";
import { AuthRoute } from "../auth/auth.route";
import ProtectedRoute from "../auth/protected.route";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* PROTECTED APP */}
        <Route element={<ProtectedRoute />}>
          <Route element={<BaseLayout />}>
            <Route path="/dashboard" element={<DashboardLayout />} />
            <Route path="/articles" element={<ArticlesLayout />} />
            <Route path="/important-links" element={<ImportantLinksPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* ADMIN (ODSEPAROWANY) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/users" element={<UsersPage />} />
              <Route path="/admin/admins" element={<AdminsPage />} />
              <Route path="/admin/products" element={<ProductsLayout />} />
              <Route path="/admin/products/:id" element={<ProductLayout />} />
            </Route>
          </Route>
        </Route>

        {/* FALLBACK */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
