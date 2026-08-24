type Props = {
  children: React.ReactNode;
  variant?: PageContainerVariant;
};

export type PageContainerVariant =
  | "default"
  | "narrow"
  | "wide"
  | "extraWide"
  | "full";

const variants: Record<PageContainerVariant, string> = {
  full: "max-w-full",
  default: "max-w-[1100px]",
  narrow: "max-w-[800px]",
  wide: "max-w-[1400px]",
  extraWide: "max-w-[1520px]",
};

export const PageContainer = ({ children, variant = "default" }: Props) => {
  return (
    <div className={`mx-auto w-full ${variants[variant]}`}>{children}</div>
  );
};
