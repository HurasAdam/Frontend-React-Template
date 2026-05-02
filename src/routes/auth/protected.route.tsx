import { Origami } from "lucide-react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { useAuthQuery } from "../../hooks/auth/use-auth";

const ProtectedRoute = () => {
  const { data: authData, isLoading } = useAuthQuery();
  const location = useLocation();

  if (isLoading) {
    return <LoadingUI />; // Twój loader
  }

  if (!authData) {
    return <Navigate to="/login" replace />;
  }

  // 🔥 DOPIERO TERAZ
  const isAdmin = authData.role === "ADMIN";
  const isAdminRoute = location.pathname.startsWith("/admin");

  // admin próbuje wejść do app
  if (isAdmin && !isAdminRoute) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // user próbuje wejść do admina
  if (!isAdmin && isAdminRoute) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

const LoadingUI = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-background via-background to-muted/20">
      {/* BACKDROP GLOW */}
      <div className="absolute w-[420px] h-[420px] bg-primary/10 rounded-full blur-3xl animate-pulse" />

      <Card className="relative w-[360px] border border-muted/40 shadow-2xl rounded-2xl bg-background/60 backdrop-blur-xl">
        <CardContent className="flex flex-col items-center py-10">
          {/* ICON */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-24 h-24 rounded-full bg-primary/20 blur-2xl animate-pulse" />

            <Origami className="w-10 h-10 text-primary relative" />
          </div>

          {/* TITLE */}
          <h1 className="mt-6 text-xl font-semibold tracking-tight">
            Baza Wiedzy
          </h1>

          {/* SUBTITLE */}
          <p className="mt-2 text-sm text-muted-foreground text-center leading-relaxed">
            Przygotowujemy Twoje dane
            <br />
            Proszę czekać...
          </p>

          {/* DOT LOADER */}
          <div className="flex gap-1.5 mt-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:300ms]" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
