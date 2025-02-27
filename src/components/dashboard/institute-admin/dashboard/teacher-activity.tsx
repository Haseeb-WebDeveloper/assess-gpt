"use client";

import { motion } from "framer-motion";
import { GraduationCap, TrendingUp, Clock, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const teacherActivities = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    subject: "Mathematics",
    assessments: 24,
    avgGradingTime: "1.5h",
    rating: 4.8,
    performance: 92,
    avatar: "SJ",
    status: "online",
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    subject: "Physics",
    assessments: 18,
    avgGradingTime: "2h",
    rating: 4.7,
    performance: 88,
    avatar: "MC",
    status: "offline",
  },
  {
    id: 3,
    name: "Ms. Emily Brown",
    subject: "English",
    assessments: 31,
    avgGradingTime: "1h",
    rating: 4.9,
    performance: 95,
    avatar: "EB",
    status: "online",
  },
  {
    id: 4,
    name: "Dr. Robert Wilson",
    subject: "Chemistry",
    assessments: 22,
    avgGradingTime: "1.8h",
    rating: 4.6,
    performance: 86,
    avatar: "RW",
    status: "away",
  },
];

export function TeacherActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-card border border-border/50 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Teacher Activity</h2>
        <div className="text-sm text-muted-foreground">
          Last 30 days
        </div>
      </div>

      <div className="space-y-6">
        {teacherActivities.map((teacher, index) => (
          <motion.div
            key={teacher.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                    {teacher.avatar}
                  </div>
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                      teacher.status === "online"
                        ? "bg-green-500"
                        : teacher.status === "away"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                    }`}
                  />
                </div>
                <div>
                  <h3 className="font-medium">{teacher.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {teacher.subject}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{teacher.assessments}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{teacher.avgGradingTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">{teacher.rating}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Progress value={teacher.performance} className="h-2" />
              <span className="text-sm font-medium w-12">
                {teacher.performance}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 