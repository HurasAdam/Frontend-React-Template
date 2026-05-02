import { LuLoader } from "react-icons/lu";
import { ModeToggle } from "../../../../components/theme/ModeToggle";

export const LoadingPage = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full h-screen bg-">
      <LuLoader className="w-7 h-7 animate-spin text-slate-700" />
      <ModeToggle />
      <p className="text-sm text-slate-500 tracking-wide">
        Ładowanie danych...
      </p>
    </div>
  );
};
