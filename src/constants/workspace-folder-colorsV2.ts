export type FolderColor =
  | "slate"
  | "blue"
  | "violet"
  | "emerald"
  | "amber"
  | "rose"
  | "teal"
  | "orange";

export const FOLDER_COLORS: {
  value: FolderColor;
  label: string;
  accentClass: string;
  textClass: string;
  softClass: string;
  headerClass: string;
  ringClass: string;
}[] = [
  {
    value: "slate",
    label: "Grafit",
    accentClass: "bg-slate-600",
    textClass: "text-slate-600",
    softClass: "bg-slate-500/10",
    headerClass: "from-slate-500/15",
    ringClass: "ring-slate-500/20",
  },
  {
    value: "blue",
    label: "Błękit",
    accentClass: "bg-blue-600",
    textClass: "text-blue-600",
    softClass: "bg-blue-500/10",
    headerClass: "from-blue-500/15",
    ringClass: "ring-blue-500/20",
  },
  {
    value: "violet",
    label: "Fiolet",
    accentClass: "bg-violet-600",
    textClass: "text-violet-600",
    softClass: "bg-violet-500/10",
    headerClass: "from-violet-500/15",
    ringClass: "ring-violet-500/20",
  },
  {
    value: "emerald",
    label: "Szmaragd",
    accentClass: "bg-emerald-600",
    textClass: "text-emerald-600",
    softClass: "bg-emerald-500/10",
    headerClass: "from-emerald-500/15",
    ringClass: "ring-emerald-500/20",
  },
  {
    value: "teal",
    label: "Turkus",
    accentClass: "bg-teal-600",
    textClass: "text-teal-600",
    softClass: "bg-teal-500/10",
    headerClass: "from-teal-500/15",
    ringClass: "ring-teal-500/20",
  },
  {
    value: "amber",
    label: "Bursztyn",
    accentClass: "bg-amber-500",
    textClass: "text-amber-500",
    softClass: "bg-amber-500/10",
    headerClass: "from-amber-500/15",
    ringClass: "ring-amber-500/20",
  },
  {
    value: "orange",
    label: "Pomarańcz",
    accentClass: "bg-orange-600",
    textClass: "text-orange-600",
    softClass: "bg-orange-500/10",
    headerClass: "from-orange-500/15",
    ringClass: "ring-orange-500/20",
  },
  {
    value: "rose",
    label: "Róż",
    accentClass: "bg-rose-600",
    textClass: "text-rose-600",
    softClass: "bg-rose-500/10",
    headerClass: "from-rose-500/15",
    ringClass: "ring-rose-500/20",
  },
];

const DEFAULT_FOLDER_COLOR = {
  value: "blue" as const,
  label: "Błękit",
  accentClass: "bg-blue-600",
  textClass: "text-blue-600",
  softClass: "bg-blue-500/10",
  headerClass: "from-blue-500/15",
  ringClass: "ring-blue-500/20",
};

export const getFolderColorClasses = (color: FolderColor) =>
  FOLDER_COLORS.find((option) => option.value === color) ??
  DEFAULT_FOLDER_COLOR;
