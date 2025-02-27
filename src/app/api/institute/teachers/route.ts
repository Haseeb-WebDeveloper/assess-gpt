import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";
import { connectToDatabase } from "@/lib/db";
import { InstituteTeacher } from "@/database/model/institute-teacher.model";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "institute_admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status");

    await connectToDatabase();

    // Build query
    const query = {
      instituteId: session.user.instituteId,
      ...(search && {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }),
      ...(status && { isActive: status === "active" }),
    };

    // Get total count for pagination
    const total = await InstituteTeacher.countDocuments(query);

    // Get paginated results with essential fields
    const teachers = await InstituteTeacher.find(query)
      .select('name email department isActive lastLogin')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      teachers,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    });
  } catch (error: any) {
    console.error("Failed to fetch teachers:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch teachers" },
      { status: 500 }
    );
  }
}

// Add CSV export endpoint
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "institute_admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const teachers = await InstituteTeacher.find({
      instituteId: session.user.instituteId,
    })
      .select('name email department isActive lastLogin createdAt')
      .lean();

    // Convert to CSV format
    const csvHeader = "Name,Email,Department,Status,Last Login,Created At\n";
    const csvRows = teachers.map(teacher => {
      return `${teacher.name},${teacher.email},${teacher.department || "N/A"},${
        teacher.isActive ? "Active" : "Inactive"
      },${teacher.lastLogin ? new Date(teacher.lastLogin).toLocaleDateString() : "Never"},${
        new Date(teacher.createdAt).toLocaleDateString()
      }`;
    });

    const csv = csvHeader + csvRows.join("\n");

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="teachers-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error: any) {
    console.error("Failed to export teachers:", error);
    return NextResponse.json(
      { error: error.message || "Failed to export teachers" },
      { status: 500 }
    );
  }
} 