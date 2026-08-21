"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Zap,
  Newspaper,
  Download,
  Briefcase,
  LogOut,
  Menu,
  X,
  Droplets,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: Zap },
  { name: "News", href: "/admin/news", icon: Newspaper },
  { name: "Downloads", href: "/admin/downloads", icon: Download },
  { name: "Careers", href: "/admin/careers", icon: Briefcase },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Protect admin routes — redirect to login if not authenticated
  useEffect(() => {
    if (pathname === "/admin/login") return;
    const isAuth = sessionStorage.getItem("admin_auth");
    if (!isAuth) {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    router.push("/admin/login");
  };

  return (
    <div className="flex h-screen bg-[#F7FAFB] font-sans overflow-hidden">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#0B3D5C] text-white flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <div className="bg-[#1A8FA3] p-2 rounded-lg">
            <Droplets className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-base leading-tight">Gumu Khola</p>
            <p className="text-xs text-white/50">Admin Panel</p>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#1A8FA3] text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {item.name}
                {active && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-4 pb-6 border-t border-white/10 pt-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-red-500/20 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-[#E4EAEE] h-16 flex items-center justify-between px-6 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-[#1E2A33] hover:bg-[#E4EAEE]"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden lg:block">
            <p className="text-sm font-medium text-[#1E2A33]">
              {navItems.find((i) => pathname.startsWith(i.href))?.name ?? "Admin"}
            </p>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <div className="w-8 h-8 rounded-full bg-[#0B3D5C] flex items-center justify-center text-white text-xs font-bold">
              A
            </div>
            <span className="text-sm font-medium text-[#1E2A33] hidden sm:block">Admin</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
