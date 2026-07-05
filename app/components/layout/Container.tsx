export default function Container({
  children,
  isMaxWidth = true,
  className,
}: {
  children: React.ReactNode;
  isMaxWidth?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`${isMaxWidth ? "max-w-[1300px] mx-auto" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
