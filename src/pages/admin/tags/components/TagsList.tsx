import type { ITag } from "../../../../features/tags/hooks/useTagModal";
import { TagItem } from "./TagItem";

export const TagsGrid = ({
  tags,
  openInfo,
}: {
  tags: ITag[];
  openInfo: (tag: ITag) => void;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {tags.map((tag) => (
        <TagItem key={tag.id} tag={tag} openInfo={openInfo} />
      ))}

      {tags.length === 0 && (
        <div className="col-span-full text-center text-sm text-muted-foreground py-10">
          Brak tagów
        </div>
      )}
    </div>
  );
};
