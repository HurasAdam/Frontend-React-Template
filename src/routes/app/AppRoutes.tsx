import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { BaseLayout } from "../../layouts/BaseLayout";
import { ArticlesPage } from "../../pages/articles/view/ArticlesPage";
import LoginPage from "../../pages/auth/login/view/Login.page";
import { DashboardPage } from "../../pages/dashboard/view/Dashboard.page";
import { ImportantLinksPage } from "../../pages/important-links/views/ImportantLinksPage";
import { SettingsPage } from "../../pages/settings/view/SettingsPage";
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

        {/* PROTECTED */}
        <Route element={<ProtectedRoute />}>
          <Route element={<BaseLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/important-links" element={<ImportantLinksPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
