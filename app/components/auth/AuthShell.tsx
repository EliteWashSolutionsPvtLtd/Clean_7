import Navbar from "@/app/components/layout/Navbar";
import { SatoshiFont } from "@/app/fonts";

export default function AuthShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen bg-[var(--ground)] text-[var(--ink)]"
      style={{ fontFamily: SatoshiFont.style.fontFamily }}
    >
      <Navbar />
      <main className="flex min-h-screen items-center justify-center px-[clamp(20px,5vw,56px)] pb-12 pt-[120px]">
        <div className="w-full max-w-[460px] rounded-3xl border border-[var(--line)] bg-[var(--card)] p-6 shadow-sm sm:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
