export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
    rounded-xl
    border
    bg-card
    overflow-hidden
    shadow-sm
  "
    >
      {children}
    </div>
  );
}
