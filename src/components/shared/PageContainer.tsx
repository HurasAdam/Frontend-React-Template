type Props = {
  children: React.ReactNode;
  variant?: "default" | "narrow" | "wide";
};

const variants = {
  default: "max-w-[1100px]",
  narrow: "max-w-[800px]",
  wide: "max-w-[1340px]",
};

export const PageContainer = ({ children, variant = "default" }: Props) => {
  return (
    <div className={`mx-auto w-full ${variants[variant]}`}>{children}</div>
  );
};
