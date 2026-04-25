import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../../hooks/auth/use-auth";
import { LoginForm } from "../components/Login.form";

export default function LoginPage() {
  const { mutate, isPending } = useLoginMutation();
  const navigate = useNavigate();
  const handleLogin = (values: unknown) => {
    mutate(values, {
      onSuccess: () => {
        navigate("/", { replace: true });
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
