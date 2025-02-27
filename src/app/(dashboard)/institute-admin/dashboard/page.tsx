import { Metadata } from "next";
import { DashboardStats } from "@/components/dashboard/institute-admin/dashboard/stats";
import { RecentAssessments } from "@/components/dashboard/institute-admin/dashboard/recent-assessments";
import { TeacherActivity } from "@/components/dashboard/institute-admin/dashboard/teacher-activity";

export const metadata: Metadata = {
  title: "Institute Admin Dashboard - Fluxtile",
};

export default function InstituteAdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening in your institute.
        </p>
      </div>

      <DashboardStats />

      <div className="grid lg:grid-cols-2 gap-8">
        <RecentAssessments />
        <TeacherActivity />
      </div>
    </div>
  );
} 