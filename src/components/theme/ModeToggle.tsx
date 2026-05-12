import { Moon, Sun } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useTheme } from "../../providers/theme.provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Select
      value={theme}
      onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
    >
      <SelectTrigger
        className="
          w-[160px]
          rounded-xl
          border-border/60
          bg-background/80
          backdrop-blur
          shadow-sm
          transition-all
        "
      >
        <SelectValue placeholder="Motyw" />
      </SelectTrigger>

      <SelectContent
        className="
          rounded-2xl
          border-border/60
          bg-background/95
          backdrop-blur-xl
          shadow-2xl
          p-2
        "
      >
        <SelectItem
          value="light"
          className="
            rounded-xl
            cursor-pointer
            transition-colors
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex items-center justify-center
                size-7 rounded-lg
                bg-amber-500/10
              "
            >
              <Sun className="size-4 text-amber-500" />
            </div>

            <div className="flex flex-col items-start">
              <span className="text-xs text-muted-foreground">Jasny</span>
            </div>
          </div>
        </SelectItem>

        <SelectItem
          value="dark"
          className="
            rounded-xl
            cursor-pointer
            transition-colors
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex items-center justify-center
                size-7 rounded-lg
                bg-indigo-500/10
              "
            >
              <Moon className="size-4 text-indigo-400" />
            </div>

            <div className="flex flex-col items-start">
              <span className="text-xs text-muted-foreground">Ciemny</span>
            </div>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
