interface Props {
  title: string;
  children: React.ReactNode;
}

export const SettingsSection = ({ title, children }: Props) => (
  <div className="mb-12">
    <h2 className="text-sm font-medium text-muted-foreground mb-4 mx-3">
      {title}
    </h2>
    {children}
  </div>
);
