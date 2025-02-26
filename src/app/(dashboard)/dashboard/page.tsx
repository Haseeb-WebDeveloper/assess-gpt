import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {session?.user?.name}
      </h1>
      <p className="text-muted-foreground">
        This is your teacher dashboard. Start managing your assignments and
        students.
      </p>
    </div>
  );
}
