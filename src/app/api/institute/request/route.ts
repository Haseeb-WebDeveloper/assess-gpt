import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mail";
import { connectToDatabase } from "@/lib/db";
import { InstituteRequest } from "@/database/model/institute-request.model";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Validate required fields
    const requiredFields = [
      "instituteName",
      "contactName",
      "email",
      "phone",
      "location",
      "requestedSubdomain",
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    try {
      // Send email to admin
      await sendEmail({
        to: process.env.SENDER_EMAIL!,
        subject: `New Institute Request: ${data.instituteName}`,
        template: "INSTITUTE_REQUEST",
        data: {
          ...data,
          timestamp: new Date().toISOString(),
        },
      });

      // Send confirmation email to institute
      await sendEmail({
        to: data.email,
        subject: "We've Received Your Request - AssessGPT",
        template: "WELCOME_INSTITUTE",
        data: {
          contactName: data.contactName,
          instituteName: data.instituteName,
        },
      });



      await connectToDatabase();

      // Save request to database
      const instituteRequest = await InstituteRequest.create({
        instituteName: data.instituteName,
        requestedSubdomain: data.requestedSubdomain,
        contactName: data.contactName,
        contactEmail: data.email,
        phone: data.phone,
        location: data.location,
        additionalInfo: data.description,
        expectedStudents: data.expectedStudents,
      });

      console.log(instituteRequest);

      return NextResponse.json(
        { message: "Request submitted successfully", instituteRequest },
        { status: 200 }
      );
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      return NextResponse.json(
        { message: "Request received but notification failed" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Institute request error:", error);
    return NextResponse.json(
      { message: "Failed to process request" },
      { status: 500 }
    );
  }
} 