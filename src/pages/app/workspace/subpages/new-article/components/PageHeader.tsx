import { FilePlus2 } from "lucide-react";

const CreateArticleHeader = () => {
  return (
    <header
      className="
        flex
        items-center
        gap-4
        w-full
      "
    >
      {/* ICON */}
      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          bg-primary/10
          text-primary
          ring-1
          ring-primary/20
          shadow-sm
        "
      >
        <FilePlus2 className="h-5 w-5" />
      </div>

      {/* TEXT */}
      <div className="flex flex-col">
        <h1
          className="
            text-2xl
            font-semibold
            tracking-tight
          "
        >
          Nowy artykuł
        </h1>

        <p
          className="
            mt-1
            text-sm
            text-muted-foreground
            leading-5
          "
        >
          Uzupełnij wymagane informacje, aby utworzyć nowy artykuł.
        </p>
      </div>
    </header>
  );
};

export default CreateArticleHeader;
