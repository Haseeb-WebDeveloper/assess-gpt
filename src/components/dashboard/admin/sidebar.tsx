"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  Settings,
  BarChart3,
  Mail,
  Shield,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/gpt-admin/dashboard",
  },
  {
    title: "Institute Requests",
    icon: Mail,
    href: "/gpt-admin/institute-requests",
    badge: "3",
  },
  {
    title: "Institutes",
    icon: Building2,
    href: "/gpt-admin/institutes",
  },
  {
    title: "Users",
    icon: Users,
    href: "/gpt-admin/users",
  },
  {
    title: "Assignments",
    icon: FileText,
    href: "/gpt-admin/assignments",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/gpt-admin/analytics",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/gpt-admin/settings",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border/40 z-50">
      {/* Logo */}
      <div className="h-16 flex items-center px-6">
        <Link href="/gpt-admin/dashboard" className="flex items-center gap-2">
          <Shield className="h-7 w-7 text-primary" />
          <span className="font-semibold text-xl">AssessGPT</span>
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
                  {item.badge && (
                    <span className="ml-auto bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                      {item.badge}
                    </span>
                  )}
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
