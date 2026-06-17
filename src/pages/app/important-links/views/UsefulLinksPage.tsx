import { useMemo, useState } from "react";
import type { ILink } from "../../../../features/usefull-links/hooks/useUsefullLinkModal";
import { useFindUsefullLinksWithCategoryQuery } from "../../../../hooks/usefullLinks/queries/usefullLinks.queries";
import type { ILinkCategory } from "../../../../services/usefullLinks/usefullLink.types";
import { UsefulLinksCategorySection } from "../components/UsefulLinksCategorySection";
import { UsefulLinksEmptyState } from "../components/UsefulLinksEmptyState";
import { UsefulLinksHeader } from "../components/UsefulLinksHeader";
import { UsefulLinksSearchBar } from "../components/UsefulLinksSearchBar";

interface Props {
  openAddLink: () => void;
  openAddCategory: () => void;
  openLinkInfo: (link: ILink) => void;
}

export const UsefulLinksPage = ({
  openAddLink,
  openLinkInfo,
  openAddCategory,
}: Props) => {
  const { data = [] } = useFindUsefullLinksWithCategoryQuery();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return data.filter(
      (link) =>
        link.name.toLowerCase().includes(search.toLowerCase()) ||
        link.url.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  const categories: ILinkCategory[] = useMemo(() => {
    const unique = filtered.flatMap((l) => (l.category ? [l.category] : []));

    return unique
      .filter((cat, i, self) => self.findIndex((c) => c.id === cat.id) === i)
      .sort((a, b) => a.order - b.order);
  }, [filtered]);

  return (
    <div className="min-h-screen bg-background">
      <div className="">
        <UsefulLinksHeader onAddLink={openAddLink} />

        <UsefulLinksSearchBar
          onAddLink={openAddLink}
          onAddCategory={openAddCategory}
          value={search}
          onChange={(value) => setSearch(value)}
        />

        <div className="space-y-10">
          {categories.map((category) => {
            const links = filtered.filter((link) => {
              return link.category?.id === category.id;
            });

            return (
              <UsefulLinksCategorySection
                key={category.id}
                category={category}
                links={links}
                openLinkInfo={openLinkInfo}
              />
            );
          })}
          {!filtered.length && <UsefulLinksEmptyState />}
        </div>
      </div>
    </div>
  );
};
