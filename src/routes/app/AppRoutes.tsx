import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BaseLayout } from "../../layouts/BaseLayout";
import { AuthRoute } from "../auth/auth.route";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/auth" element={<BaseLayout />}>
            <Route />
            <Route />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
