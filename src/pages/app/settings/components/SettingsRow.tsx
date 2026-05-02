interface Props {
  title: string;
  description: string;
  right: React.ReactNode;
}

export const SettingsRow = ({ title, description, right }: Props) => (
  <div className="flex items-center px-6 py-5">
    {/* LEFT */}
    <div className="w-[60%] pr-6">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </div>

    {/* RIGHT */}
    <div className="w-[40%] flex justify-end">{right}</div>
  </div>
);
