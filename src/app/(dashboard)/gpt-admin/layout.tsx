import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth.config";
import AdminSidebar from "@/components/dashboard/admin/sidebar";
import AdminHeader from "@/components/dashboard/admin/header";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "platform-admin") {
    redirect("/auth/platform-admin/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <div className="pl-64">
        <AdminHeader />
        <main className="pt-16 p-8">{children}</main>
      </div>
    </div>
  );
}
