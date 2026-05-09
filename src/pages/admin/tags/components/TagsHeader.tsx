import { Hash, Plus } from "lucide-react";

export const TagsHeader = ({ openAdd }: { openAdd: () => void }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Hash size={20} />
          Tagi
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Zarządzaj tagami systemowymi
        </p>
      </div>

      <button
        onClick={openAdd}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
      >
        <Plus size={16} />
        Dodaj tag
      </button>
    </div>
  );
};
