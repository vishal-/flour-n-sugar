import Link from "next/link";
import { AdminNav } from "@/components/admin/AdminNav";
import { NotoIcon } from "@/components/ui/NotoIcon";
import { MatIcon } from "@/components/ui/MatIcon";
import cupcake from "@iconify-icons/noto/cupcake";
import adminPanelSettingsOutlineRounded from "@iconify-icons/material-symbols/admin-panel-settings-outline-rounded";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary-light selection:text-primary">
      {/* Top Admin Header Bar */}
      <div className="bg-[#241714] text-rose-100 border-b border-rose-950/60 py-2.5 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5 font-bold">
            <NotoIcon icon={cupcake} size={16} />
            <span className="font-serif tracking-wide text-sm font-bold text-rose-50">
              Flour n Sugar
            </span>
            <span className="text-[10px] uppercase tracking-wider bg-rose-900/60 text-rose-200 border border-rose-800/40 px-2 py-0.5 rounded-full flex items-center gap-1 font-extrabold">
              <MatIcon icon={adminPanelSettingsOutlineRounded} size={13} />
              <span>Platform Admin</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link
              href="/dashboard"
              className="text-rose-200/70 hover:text-white transition hidden sm:inline"
            >
              Store Dashboard
            </Link>
            <Link
              href="/home"
              className="text-rose-200/70 hover:text-white transition"
            >
              ← Back to App
            </Link>
          </div>
        </div>
      </div>

      {/* Admin Sub-Navigation */}
      <AdminNav />

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
