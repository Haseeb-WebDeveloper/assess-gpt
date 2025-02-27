import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";
import { connectToDatabase } from "@/lib/db";
import { sendEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";
import { InstituteTeacher } from "@/database/model/institute-teacher.model";
import { Institute } from "@/database/model/institute.model";

interface TeacherData {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "institute_admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { teachers } = await req.json();
    if (!Array.isArray(teachers) || teachers.length === 0) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check for duplicate emails
    const existingEmails = await InstituteTeacher.find({
      email: { $in: teachers.map(t => t.email) }
    }).select('email');

    if (existingEmails.length > 0) {
      return NextResponse.json({
        error: `Email(s) already in use: ${existingEmails.map(t => t.email).join(', ')}`
      }, { status: 400 });
    }

    // getting institute details
    const institute = await Institute.findById(session.user.instituteId);

    // Create teacher accounts
    const createdTeachers = await Promise.all(
      teachers.map(async (teacher: TeacherData) => {
        const hashedPassword = await bcrypt.hash(teacher.password, 10);
        
        const newTeacher = await InstituteTeacher.create({
          name: teacher.name,
          email: teacher.email,
          password: hashedPassword,
          instituteId: session.user.instituteId,
          role: 'teacher',
          isActive: true,
        });

        // Send welcome email
        await sendEmail({
          to: teacher.email,
          subject: "Welcome to Fluxtile - Your Teacher Account",
          template: "INSTITUTE_TEACHER_WELCOME",
          data: {
            name: teacher.name,
            email: teacher.email,
            password: teacher.password,
            loginUrl: `https://${institute?.subdomain}/fluxtile.com/auth/institute/teacher/login`,
          },
        });

        return newTeacher;
      })
    );

    return NextResponse.json({
      message: `Successfully created ${createdTeachers.length} teacher accounts`,
      teachers: createdTeachers,
    });

  } catch (error: any) {
    console.error("Bulk teacher creation error:", error);
    return NextResponse.json(
      { error: "Failed to create teacher accounts" },
      { status: 500 }
    );
  }
} 