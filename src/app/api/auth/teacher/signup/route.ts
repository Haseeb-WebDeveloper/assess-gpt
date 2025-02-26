import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { IndividualTeacher } from "@/database/model/individual-teacher.model";
import { connectToDatabase } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, email, password, organization } = await req.json();

    // Validate input
    if (!name || !email || !password || !organization) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Check if user exists
    const existingTeacher = await IndividualTeacher.findOne({ email });
    if (existingTeacher) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create teacher
    const teacher = await IndividualTeacher.create({
      name,
      email,
      password: hashedPassword,
      organization,
      profileImage: "https://via.placeholder.com/150",
      bannerImage: "https://via.placeholder.com/1500x500",
      isVerified: false,
      subjects: [],
      notifications: [],
      settings: {
        emailNotifications: true,
        autoGrading: true,
      },
    });

    return NextResponse.json(
      { message: "Teacher account created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 