import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, FileText, Mail } from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  const stats = [
    {
      title: "Total Institutes",
      value: "156",
      change: "+12%",
      icon: Building2,
      trend: "up",
    },
    {
      title: "Active Users",
      value: "2,345",
      change: "+25%",
      icon: Users,
      trend: "up",
    },
    {
      title: "Assignments",
      value: "12,456",
      change: "+18%",
      icon: FileText,
      trend: "up",
    },
    {
      title: "Pending Requests",
      value: "3",
      change: "New",
      icon: Mail,
      trend: "new",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Welcome back, {session?.user?.name}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="bg-card/50 hover:bg-card/80 transition-colors"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-primary/10`}>
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center mt-1">
                <span
                  className={`text-xs font-medium ${
                    stat.trend === "up"
                      ? "text-emerald-500"
                      : stat.trend === "new"
                      ? "text-blue-500"
                      : "text-red-500"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground ml-1">
                  from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Recent Institute Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* We'll add the requests list in the next update */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">System Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {/* We'll add the activity feed in the next update */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
