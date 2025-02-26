import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";
import { InstituteRequest } from "@/database/model/institute-request.model";
import { connectToDatabase } from "@/lib/db";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function getInstituteRequests() {
  try {
    await connectToDatabase();
    const requests = await InstituteRequest.find({})
      .sort({ createdAt: -1 })
      .lean();

    return requests.map(request => ({
      ...request,
      id: request._id.toString(),
      createdAt: request.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error("Failed to fetch institute requests:", error);
    return [];
  }
}

export default async function InstituteRequestsPage() {
  const session = await getServerSession(authOptions);
  const requests = await getInstituteRequests();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Institute Requests</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage and review institute access requests
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <div className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requests.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <div className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {requests.filter(r => r.status === "pending").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
            <div className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {requests.filter(r => {
                const today = new Date();
                const requestDate = new Date(r.createdAt);
                return (
                  r.status === "approved" &&
                  requestDate.toDateString() === today.toDateString()
                );
              }).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <DataTable columns={columns} data={requests} />
            </CardContent>
          </Card>
        </TabsContent>
        {/* Add other tab contents similarly */}
      </Tabs>
    </div>
  );
} 