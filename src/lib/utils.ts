import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date?: string) =>
  date ? format(new Date(date), "dd.MM.yyyy") : "-";

export function formatRelativeDate(date: string | Date): string {
  const now = new Date();
  const target = new Date(date);

  const diffMs = now.getTime() - target.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) {
    return "przed chwilą";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} min. temu`;
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

  if (diffDays < 14) {
    return "tydzień temu";
  }

  if (diffDays < 30) {
    return `${Math.floor(diffDays / 7)} tyg. temu`;
  }

  if (diffDays < 365) {
    return `${Math.floor(diffDays / 30)} mies. temu`;
  }

  return `${Math.floor(diffDays / 365)} lat temu`;
}
