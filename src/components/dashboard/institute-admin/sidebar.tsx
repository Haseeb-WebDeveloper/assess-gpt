"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  FileText,
  Settings,
  BarChart3,
  Building2,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/institute-admin/dashboard",
  },
  {
    title: "Teachers",
    icon: GraduationCap,
    href: "/institute-admin/teachers",
  },
  {
    title: "Students",
    icon: Users,
    href: "/institute-admin/students",
  },
  {
    title: "Assessments",
    icon: FileText,
    href: "/institute-admin/assessments",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/institute-admin/analytics",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/institute-admin/settings",
  },
];

export function InstituteAdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border/40">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border/40">
        <Link href="/institute-admin/dashboard" className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg">Institute Admin</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="px-3 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <item.icon size={20} strokeWidth={1.8} />
                  <span>{item.title}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 top-0 w-1 h-full bg-primary rounded-r-full"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
} 