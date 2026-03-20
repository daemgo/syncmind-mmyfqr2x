"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Target,
  User,
  FolderKanban,
  Sparkles,
} from "lucide-react";

const navItems = [
  {
    title: "仪表盘",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "客户管理",
    href: "/customers",
    icon: Users,
  },
  {
    title: "销售机会",
    href: "/opportunities",
    icon: Target,
  },
  {
    title: "联系人",
    href: "/contacts",
    icon: User,
  },
  {
    title: "项目管理",
    href: "/projects",
    icon: FolderKanban,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-sidebar text-sidebar-foreground">
      {/* Brand header */}
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground font-bold text-base shadow-lg shadow-sidebar-primary/20">
            S
          </div>
          <div>
            <span className="font-semibold text-sm tracking-wide">syncMind</span>
            <span className="block text-[10px] text-sidebar-foreground/50 font-normal tracking-wider uppercase">CRM</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3 mt-2">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
          Menu
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md shadow-sidebar-primary/25"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2 rounded-lg bg-sidebar-accent/50 p-3 text-xs text-sidebar-foreground/60">
          <Sparkles className="h-3.5 w-3.5 text-sidebar-primary" />
          <div>
            <p className="font-medium text-sidebar-foreground/80">Demo</p>
            <p className="mt-0.5">Mock 数据演示</p>
          </div>
        </div>
      </div>
    </div>
  );
}
