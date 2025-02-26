"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { Bell, Search, Sun, Moon, Settings, User } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { Button } from "@/components/ui/button";

export default function AdminHeader() {
  const { theme, setTheme } = useTheme();
  const [notifications] = useState([
    { id: 1, message: "New institute request from Harvard University" },
    { id: 2, message: "System update scheduled for tomorrow" },
  ]);

  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-background/50 backdrop-blur-lg border-b border-border/40 z-40">
      <div className="flex items-center justify-between h-full px-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full h-9 pl-10 pr-4 text-sm bg-background rounded-lg border border-border/50 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="secondary"
            size="sm"
            className="h-9 w-9 rounded-lg"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="secondary"
              size="sm"
              className="h-9 w-9 rounded-lg"
            >
              <Bell size={18} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-[11px] font-medium text-primary-foreground rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </Button>
          </div>

          {/* Settings */}
          <Button
            variant="secondary"
            size="sm"
            className="h-9 w-9 rounded-lg"
          >
            <Settings size={18} />
          </Button>

          {/* Profile */}
          <Button
            variant="secondary"
            size="sm"
            className="h-9 w-9 rounded-lg"
            onClick={() => signOut()}
          >
            <User size={18} />
          </Button>
        </div>
      </div>
    </header>
  );
}
