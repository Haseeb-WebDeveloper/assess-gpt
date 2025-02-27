"use client";

import { motion } from "framer-motion";
import { Users, GraduationCap, FileText, CheckCircle } from "lucide-react";

const stats = [
  {
    title: "Total Students",
    value: "2,845",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "blue",
  },
  {
    title: "Active Teachers",
    value: "148",
    change: "+4.3%",
    trend: "up",
    icon: GraduationCap,
    color: "green",
  },
  {
    title: "Assessments",
    value: "1,257",
    change: "+28.4%",
    trend: "up",
    icon: FileText,
    color: "purple",
  },
  {
    title: "Completion Rate",
    value: "94.2%",
    change: "+2.1%",
    trend: "up",
    icon: CheckCircle,
    color: "yellow",
  },
];

const colorVariants = {
  blue: "bg-blue-500/10 text-blue-500",
  green: "bg-green-500/10 text-green-500",
  purple: "bg-purple-500/10 text-purple-500",
  yellow: "bg-yellow-500/10 text-yellow-500",
};

export function DashboardStats() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-card border border-border/50 rounded-xl p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div
              className={`p-2 rounded-lg ${
                colorVariants[stat.color as keyof typeof colorVariants]
              }`}
            >
              <stat.icon className="h-5 w-5" />
            </div>
            <div
              className={`text-xs font-medium ${
                stat.trend === "up" ? "text-green-500" : "text-red-500"
              }`}
            >
              {stat.change}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </h3>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 