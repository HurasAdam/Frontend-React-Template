import { Sparkles, Star } from "lucide-react";

export const articleTypeLabels: Record<
  ArticleLabel,
  {
    label: string;
    icon: typeof Star;
    color: string;
  }
> = {
  important: {
    label: "Ważne",
    icon: Star,
    color: "text-amber-500",
  },
};

export type Article = {
  id: string;
  title: string;
  label: ArticleLabel | null;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
    surname: string;
  } | null;
};

export const newArticleConfig = {
  label: "Nowe",
  icon: Sparkles,
  color: "text-blue-500",
};

export type ArticleLabel = "important";
export type ArticleFilter = ArticleLabel | "new" | "all";

export function formatRelativeDate(dateString: string) {
  const createdAt = new Date(dateString);
  const now = new Date();

  const diffMs = now.getTime() - createdAt.getTime();

  if (diffMs < 0) {
    return createdAt.toLocaleDateString("pl-PL");
  }

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) {
    return "przed chwilą";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} min temu`;
  }

  if (diffHours < 24) {
    return `${diffHours} godz. temu`;
  }

  if (diffDays === 1) {
    return "wczoraj";
  }

  if (diffDays < 7) {
    return `${diffDays} dni temu`;
  }

  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);

    return `${weeks} ${weeks === 1 ? "tydzień" : "tygodnie"} temu`;
  }

  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);

    return `${months} ${months === 1 ? "miesiąc" : "miesięcy"} temu`;
  }

  return createdAt.toLocaleDateString("pl-PL");
}

export function isNewArticle(dateString: string) {
  const createdAt = new Date(dateString).getTime();
  const now = Date.now();

  const diffMs = now - createdAt;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  return diffDays >= 0 && diffDays <= NEW_ARTICLE_DAYS;
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const NEW_ARTICLE_DAYS = 3;
