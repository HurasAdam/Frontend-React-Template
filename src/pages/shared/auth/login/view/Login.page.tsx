import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useLoginMutation } from "../../../../../hooks/auth/use-auth";
import { LoginForm } from "../components/Login.form";

export default function LoginPage() {
  const { mutate, isPending } = useLoginMutation();
  const navigate = useNavigate();
  const handleLogin = (values: unknown) => {
    mutate(values, {
      onSuccess: (data: any) => {
        const user = data; // albo skąd to bierzesz

        if (user.role === "ADMIN") {
          navigate("/admin/dashboard", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      },
      onError: (err: any) => {
        const errorCode = err.errorCode;
        console.log("E :", err);

        if (errorCode === "InvalidCredentials") {
          toast.error("Błąd logowania", {
            description: "Nieprawidłowy login lub hasło",
            position: "top-center",
          });
        } else if (errorCode === "AccountDisabled") {
          toast.error("Konto zablokowane", {
            description: "Skontaktuj się z administratorem",
          });
        } else {
          toast.error("Błąd", {
            description: "Coś poszło nie tak",
          });
        }
      },
    });
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center  p-6 md:p-10 w-full">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm onSubmit={handleLogin} isLoading={isPending} />
      </div>
    </div>
  );
}
