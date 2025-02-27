import { InstituteAdminSidebar } from "@/components/dashboard/institute-admin/sidebar";
import { InstituteAdminHeader } from "@/components/dashboard/institute-admin/header";

export default function InstituteAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <InstituteAdminSidebar />
      <div className="pl-64">
        <InstituteAdminHeader />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
} 