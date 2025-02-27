"use client";

import { motion } from "framer-motion";
import { FileText, MoreVertical, ArrowUpRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const recentAssessments = [
  {
    id: 1,
    title: "Mid-Term Mathematics Exam",
    subject: "Mathematics",
    teacher: "Dr. Sarah Johnson",
    submissions: 142,
    dueDate: "2024-04-15",
    status: "active",
  },
  {
    id: 2,
    title: "Physics Quiz - Chapter 4",
    subject: "Physics",
    teacher: "Prof. Michael Chen",
    submissions: 98,
    dueDate: "2024-04-12",
    status: "active",
  },
  {
    id: 3,
    title: "English Literature Essay",
    subject: "English",
    teacher: "Ms. Emily Brown",
    submissions: 156,
    dueDate: "2024-04-10",
    status: "completed",
  },
  {
    id: 4,
    title: "Chemistry Lab Report",
    subject: "Chemistry",
    teacher: "Dr. Robert Wilson",
    submissions: 112,
    dueDate: "2024-04-08",
    status: "completed",
  },
];

export function RecentAssessments() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-card border border-border/50 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Recent Assessments</h2>
        <Button variant="outline" size="sm">
          View All
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {recentAssessments.map((assessment, index) => (
          <motion.div
            key={assessment.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">{assessment.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {assessment.teacher} • {assessment.subject}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">{assessment.submissions} submissions</p>
                <p className="text-xs text-muted-foreground">
                  Due {new Date(assessment.dueDate).toLocaleDateString()}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Edit Assessment</DropdownMenuItem>
                  <DropdownMenuItem>Download Results</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 