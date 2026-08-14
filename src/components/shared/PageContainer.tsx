type Props = {
  children: React.ReactNode;
  variant?: "default" | "narrow" | "wide" | "full";
};

const variants = {
  full: "max-w-full",
  default: "max-w-[1100px]",
  narrow: "max-w-[800px]",
  wide: "max-w-[1400px]",
};

export const PageContainer = ({ children, variant = "default" }: Props) => {
  return (
    <div className={`mx-auto w-full ${variants[variant]}`}>{children}</div>
  );
};
