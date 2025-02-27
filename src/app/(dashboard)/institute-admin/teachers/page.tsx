import { Metadata } from "next";
import { TeachersList } from "@/components/dashboard/institute-admin/teachers/teachers-list";
import { BulkTeacherUpload } from "@/components/dashboard/institute-admin/teachers/bulk-upload";

export const metadata: Metadata = {
  title: "Teachers Management - Fluxtile",
};

export default function TeachersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Teachers Management</h1>
        <p className="text-muted-foreground">
          Manage your institute's teachers and their accounts.
        </p>
      </div>

      <BulkTeacherUpload />
      <TeachersList />
    </div>
  );
} 