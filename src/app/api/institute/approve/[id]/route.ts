import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { InstituteRequest } from "@/database/model/institute-request.model";
import { Institute } from "@/database/model/institute.model";
import InstituteAdmin from "@/database/model/institute-admin.model";
import { sendEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";

type Props = {
  params: {
    id: string;
  };
};

export async function POST(request: NextRequest, { params }: Props) {
  try {
    const data = await request.json();
    await connectToDatabase();

    // 1. Get the institute request
    const instituteRequest = await InstituteRequest.findById(params.id);
    if (!instituteRequest) {
      return NextResponse.json(
        { message: "Institute request not found" },
        { status: 404 }
      );
    }

    // 2. Create the institute
    const institute = await Institute.create({
      name: data.instituteName,
      email: data.instituteEmail,
      subdomain: data.subdomain,
      isVerified: true,
      isActive: true,
    });

    // 3. Create the institute admin
    const hashedPassword = await bcrypt.hash(data.adminPassword, 12);
    const instituteAdmin = await InstituteAdmin.create({
      email: data.adminEmail,
      password: hashedPassword,
      instituteId: institute._id,
      role: "institute_admin",
      permissions: ["all"],
    });

    // 4. Update the institute request
    await InstituteRequest.findByIdAndUpdate(params.id, {
      status: "approved",
      approvedInstituteId: institute._id,
    });

    // 5. Send emails
    await Promise.all([
      // Email to institute
      sendEmail({
        to: data.instituteEmail,
        subject: "Your Institute Account is Ready - Flextile",
        template: "INSTITUTE_APPROVED",
        data: {
          instituteName: data.instituteName,
          subdomain: `${data.subdomain}.flextile.com`,
          adminEmail: data.adminEmail,
          adminPassword: data.adminPassword,
        },
      }),
      // Email to admin
      sendEmail({
        to: data.adminEmail,
        subject: "Your Institute Admin Account - Flextile",
        template: "INSTITUTE_ADMIN_CREDENTIALS",
        data: {
          name: data.adminName,
          instituteName: data.instituteName,
          email: data.adminEmail,
          password: data.adminPassword,
          subdomain: `${data.subdomain}.flextile.com`,
        },
      }),
    ]);

    return NextResponse.json(
      { message: "Institute approved successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Institute approval error:", error);
    return NextResponse.json(
      { message: "Failed to approve institute" },
      { status: 500 }
    );
  }
} 