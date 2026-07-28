interface Props {
  title: string;
  children: React.ReactNode;
}

export function Section({ title, children }: Props) {
  return (
    <div className="mb-10">
      <h2
        className="
      text-xs
      uppercase
      tracking-wide
      text-muted-foreground
      mb-3
    "
      >
        {title}
      </h2>

      {children}
    </div>
  );
}
