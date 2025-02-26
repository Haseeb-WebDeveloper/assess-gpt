import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth.config";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/teacher/login");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Add dashboard header/sidebar here */}
      <main className="p-8">{children}</main>
    </div>
  );
}
