export const FormSection = ({ title, action, children }: any) => (
  <div>
    <div className="px-6 py-4 border-b bg-muted/30 flex justify-between">
      <p className="text-sm font-medium">{title}</p>
      {action}
    </div>
    {children}
  </div>
);
