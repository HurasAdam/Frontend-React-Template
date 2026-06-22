import { useState } from "react";
import type { ITag } from "../../../../features/tags/hooks/useTagModal";

import { useFindTagsWithDetailsQuery } from "../../../../hooks/tags/queries/use-tags.queries";
import { TagsFilterSection } from "../components/TagsFilterSection";
import { TagsHeader } from "../components/TagsHeader";
import { TagsGrid } from "../components/TagsList";

interface Props {
  openAdd: () => void;
  openEdit: (id: string) => void;
  openInfo: (tag: ITag) => void;
}

export const TagsPage = ({ openAdd, openEdit, openInfo }: Props) => {
  const [search, setSearch] = useState("");
  const { data: tags = [] } = useFindTagsWithDetailsQuery({ name: search });

  return (
    <div className="w-full space-y-6">
      <TagsHeader openAdd={openAdd} />

      <TagsFilterSection value={search} onChange={setSearch} />

      <TagsGrid tags={tags} openInfo={openInfo} openEdit={openEdit} />
    </div>
  );
};
