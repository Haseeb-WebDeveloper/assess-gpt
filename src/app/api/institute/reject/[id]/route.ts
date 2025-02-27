import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { InstituteRequest } from "@/database/model/institute-request.model";
import { sendEmail } from "@/lib/mail";

type Props = {
  params: {
    id: string;
  };
};

export async function POST(request: NextRequest, { params }: Props) {
  try {
    const { reason } = await request.json();
    await connectToDatabase();

    // 1. Get the institute request
    const instituteRequest = await InstituteRequest.findById(params.id);
    if (!instituteRequest) {
      return NextResponse.json(
        { message: "Institute request not found" },
        { status: 404 }
      );
    }

    // 2. Update the request status
    await InstituteRequest.findByIdAndUpdate(params.id, {
      status: "rejected",
    });

    // 3. Send rejection email
    await sendEmail({
      to: instituteRequest.contactEmail,
      subject: "Update on Your Institute Request - AssessGPT",
      template: "INSTITUTE_REJECTED",
      data: {
        instituteName: instituteRequest.instituteName,
        contactName: instituteRequest.contactName,
        reason,
      },
    });

    return NextResponse.json(
      { message: "Institute request rejected successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Institute rejection error:", error);
    return NextResponse.json(
      { message: "Failed to reject institute request" },
      { status: 500 }
    );
  }
} 