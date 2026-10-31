export default function OrDivider() {
  return (
    <div className="my-6 flex items-center gap-4" role="separator">
      <span className="h-px flex-1 bg-[var(--line)]" />
      <span className="text-[14px] font-medium text-[var(--ink-soft)]">or</span>
      <span className="h-px flex-1 bg-[var(--line)]" />
    </div>
  );
}
