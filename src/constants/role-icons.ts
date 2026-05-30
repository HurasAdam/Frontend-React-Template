import {
  ChefHat,
  ChessKnight,
  CreativeCommons,
  Eye,
  FileText,
  HandFist,
  HandHelping,
  PencilRuler,
  PenTool,
  Rose,
  TreePalm,
  User,
} from "lucide-react";

export const roleIconOptions = [
  { name: "User", icon: User },
  { name: "PencilRuler", icon: PencilRuler },
  { name: "CreativeCommons", icon: CreativeCommons },
  { name: "ChessKnight", icon: ChessKnight },
  { name: "TreePalm", icon: TreePalm },
  { name: "HandFist", icon: HandFist },
  { name: "Eye", icon: Eye },
  { name: "PenTool", icon: PenTool },
  { name: "FileText", icon: FileText },
  { name: "Rose", icon: Rose },
  { name: "HandHelping", icon: HandHelping },
  { name: "ChefHat", icon: ChefHat },
];

export const roleIconMap = Object.fromEntries(
  roleIconOptions.map(({ name, icon }) => [name, icon]),
);
