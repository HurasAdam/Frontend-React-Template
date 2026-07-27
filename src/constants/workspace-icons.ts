import {
  Calculator,
  ChessKnight,
  Club,
  CreativeCommons,
  Flame,
  HandFist,
  HandHelping,
  InspectionPanel,
  LibraryBig,
  LifeBuoy,
  Pyramid,
  Rocket,
  Rose,
  Siren,
  TextCursor,
  TreePalm,
} from "lucide-react";

export const workspaceIconOptions = [
  { name: "LifeBuoy", icon: LifeBuoy },
  { name: "Pyramid", icon: Pyramid },
  { name: "CreativeCommons", icon: CreativeCommons },
  { name: "ChessKnight", icon: ChessKnight },
  { name: "TreePalm", icon: TreePalm },
  { name: "HandFist", icon: HandFist },
  { name: "Rocket", icon: Rocket },
  { name: "LibraryBig", icon: LibraryBig },
  { name: "Flame", icon: Flame },
  { name: "Rose", icon: Rose },
  { name: "HandHelping", icon: HandHelping },
  { name: "Calculator", icon: Calculator },
  { name: "Club", icon: Club },
  { name: "TextCursor", icon: TextCursor },
  { name: "InspectionPanel", icon: InspectionPanel },
  { name: "Siren", icon: Siren },
];

export const workspaceIconMap = Object.fromEntries(
  workspaceIconOptions.map(({ name, icon }) => [name, icon]),
);
