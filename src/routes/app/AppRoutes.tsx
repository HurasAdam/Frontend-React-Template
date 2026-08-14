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

import { WorkspaceLayout } from "../../layouts/WorkspaceLayout";
import { UsefulLinksLayout } from "../../pages/app/important-links/views/UsefulLinksLayout";
import { NewArticleLayout } from "../../pages/app/newArticle/view/NewArticleLayout";
import { NewWorkspaceLayout } from "../../pages/app/newWorkspace/view/NewWorkspaceLayout";
import { RegisterActivityLayout } from "../../pages/app/register-activity/view/RegisterActivityLayout";
import { SettingsLayout as AppSettingsLayout } from "../../pages/app/settings/view/SettingsLayout";
import { SettingsPage } from "../../pages/app/settings/view/SettingsPage";
import WorkspaceArticleLayout from "../../pages/app/workspace/subpages/article/view/WorkspaceArticleLayout";
import { FolderLayout } from "../../pages/app/workspace/subpages/folder/view/FolderLayout";
import { FoldersLayout } from "../../pages/app/workspace/subpages/folders/view/FoldersLayout";
import { HomeLayout } from "../../pages/app/workspace/subpages/home/view/HomeLayout";
import { MembersLayout } from "../../pages/app/workspace/subpages/members/view/MembersLayout";
import { NewWorkspaceArticleLayout } from "../../pages/app/workspace/subpages/new-article/view/NewWorkspaceArticleLayout";
import { SettingsLayout } from "../../pages/app/workspace/subpages/settings/view/SettingsLayout";
import AdminLoginPage from "../../pages/shared/auth/admin-login/view/AdminLogin.page";
import LoginPage from "../../pages/shared/auth/login/view/Login.page";
import { AdminRoute } from "../auth/admin.route";
import { AuthRoute } from "../auth/auth.route";
import ProtectedRoute from "../auth/protected.route";
import { WorkspaceRoute } from "../auth/workspace.route";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="admin/login" element={<AdminLoginPage />} />
        </Route>

        {/* PROTECTED APP */}
        <Route element={<ProtectedRoute />}>
          <Route element={<BaseLayout />}>
            <Route path="/dashboard" element={<DashboardLayout />} />
            <Route path="/articles" element={<ArticlesLayout />} />
            <Route path="/articles/new" element={<NewArticleLayout />} />
            <Route path="/workspaces/new" element={<NewWorkspaceLayout />} />
            <Route path="/important-links" element={<UsefulLinksLayout />} />
            <Route
              path="/register-activity"
              element={<RegisterActivityLayout />}
            />
            <Route path="/settings" element={<AppSettingsLayout />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<WorkspaceRoute />}>
            <Route path="/workspace/:id" element={<WorkspaceLayout />}>
              <Route index element={<HomeLayout />} />
              <Route
                path="new-article"
                element={<NewWorkspaceArticleLayout />}
              />
              <Route path="members" element={<MembersLayout />} />
              <Route path="folders" element={<FoldersLayout />} />
              <Route path="folders/:folderId" element={<FolderLayout />} />
              <Route
                path="articles/:articleId"
                element={<WorkspaceArticleLayout />}
              />
              <Route path="settings" element={<SettingsLayout />} />
            </Route>
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
