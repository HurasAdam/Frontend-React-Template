import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "../../layouts/AdminLayout";
import { BaseLayout } from "../../layouts/BaseLayout";
import { AdminsPage } from "../../pages/admin/admins/view/AdminsPage";
import { AdminDashboardPage } from "../../pages/admin/dashboard/view/AdminDashboardPage";
import AddFaqLayout from "../../pages/admin/faq/view/AddFaqLayout";
import FaqsLayout from "../../pages/admin/faqs/view/FaqsLayout";
import { ProductLayout } from "../../pages/admin/product/view/ProductLayout";
import { ProductsLayout } from "../../pages/admin/products/view/ProductsLayout";
import { AddRoleLayout } from "../../pages/admin/role/view/AddRoleLayout";
import { RolesLayout } from "../../pages/admin/roles/view/RolesLayout";
import { TagsLayout } from "../../pages/admin/tags/view/TagsLayout";
import { AddUserLayout } from "../../pages/admin/user/view/AddUserLayout";
import { UserDetailsLayout } from "../../pages/admin/user/view/UserDetailsLayout";
import { UsersLayout } from "../../pages/admin/users/views/UsersLayout";
import { ArticlesLayout } from "../../pages/app/articles/view/ArticlesLayout";
import { DashboardLayout } from "../../pages/app/dashboard/view/DashboardLayout";
import { ImportantLinksPage } from "../../pages/app/important-links/views/ImportantLinksPage";
import { NewArticleLayout } from "../../pages/app/newArticle/view/NewArticleLayout";
import { SettingsPage } from "../../pages/app/settings/view/SettingsPage";
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
            <Route path="/articles/new" element={<NewArticleLayout />} />
            <Route path="/important-links" element={<ImportantLinksPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* ADMIN (ODSEPAROWANY) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/users" element={<UsersLayout />} />
              <Route path="/admin/users/new" element={<AddUserLayout />} />
              <Route path="/admin/users/:id" element={<UserDetailsLayout />} />
              <Route path="/admin/admins" element={<AdminsPage />} />
              <Route path="/admin/roles" element={<RolesLayout />} />
              <Route path="/admin/roles/new" element={<AddRoleLayout />} />
              <Route path="/admin/products" element={<ProductsLayout />} />
              <Route path="/admin/products/:id" element={<ProductLayout />} />
              <Route path="/admin/tags" element={<TagsLayout />} />
              <Route path="/admin/faqs" element={<FaqsLayout />} />
              <Route path="/admin/faqs/new" element={<AddFaqLayout />} />

              <Route
                path="/admin/account-settings"
                element={<SettingsPage />}
              />
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
