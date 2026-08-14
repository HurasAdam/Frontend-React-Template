import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { AdminLoginForm } from "../components/AdminLogin.form";

export default function AdminLoginPage() {
  const navigate = useNavigate();

  const handleLogin = (values: unknown) => {};

  const isPending = false;

  return (
    <div className="flex min-h-svh w-full bg-background">
      {/* ── LEFT: BRAND / COMMAND CENTER PANEL ── */}
      <div className="relative hidden lg:flex lg:w-[52%] flex-col justify-between p-12 overflow-hidden bg-zinc-950 text-zinc-100">
        {/* MESH GRADIENTS */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[10%] left-[15%] w-[420px] h-[420px] rounded-full bg-blue-500/20 blur-[120px] animate-mesh-drift" />
          <div className="absolute bottom-[15%] right-[10%] w-[380px] h-[380px] rounded-full bg-emerald-500/15 blur-[120px] animate-mesh-drift-rev" />
          <div
            className="absolute top-[45%] left-[50%] w-[300px] h-[300px] rounded-full bg-indigo-500/10 blur-[100px] animate-mesh-drift"
            style={{ animationDelay: "3s" }}
          />
        </div>

        {/* GRID PATTERN */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        {/* SCAN LINE */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent animate-scan-line" />

        {/* TOP: LOGO */}
        <div className="relative z-10 flex items-center gap-2.5 animate-fade-up">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Baza Wiedzy
          </span>
          <span className="ml-2 text-[10px] font-medium uppercase tracking-widest text-blue-400/80 border border-blue-400/30 rounded px-1.5 py-0.5">
            Admin
          </span>
        </div>

        {/* CENTER: HEADLINE */}
        <div
          className="relative z-10 max-w-md animate-fade-up"
          style={{ animationDelay: "0.15s" }}
        >
          <h2 className="text-4xl font-semibold tracking-tight leading-[1.15] mb-4">
            Centrum dowodzenia
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-emerald-300 to-blue-400 bg-clip-text text-transparent">
              Bazą Wiedzy
            </span>
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            Zarządzaj użytkownikami, treścią i dostępem w jednym miejscu. Pełna
            kontrola nad systemem — bezpiecznie, efektywnie, w czasie
            rzeczywistym.
          </p>
        </div>

        {/* BOTTOM: STATS + STATUS */}
        <div
          className="relative z-10 flex items-end justify-between animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          {/* STATS */}
          <div className="flex gap-8">
            <div>
              <div className="text-2xl font-semibold">99.9%</div>
              <div className="text-xs text-zinc-500 mt-0.5">Uptime SLA</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">AES-256</div>
              <div className="text-xs text-zinc-500 mt-0.5">Encryption</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">SOC 2</div>
              <div className="text-xs text-zinc-500 mt-0.5">Compliance</div>
            </div>
          </div>

          {/* STATUS INDICATOR */}
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            System operacyjny
          </div>
        </div>
      </div>

      {/* ── RIGHT: LOGIN FORM ── */}
      <div className="relative flex flex-1 flex-col items-center justify-center p-6 md:p-10 overflow-hidden">
        {/* AMBIENT GLOW */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="relative w-full max-w-md">
          <AdminLoginForm onSubmit={handleLogin} isLoading={isPending} />
        </div>
      </div>
    </div>
  );
}
