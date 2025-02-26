import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { IndividualTeacher } from "@/database/model/individual-teacher.model";
import { connectToDatabase } from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          await connectToDatabase();

          const teacher = await IndividualTeacher.findOne({ 
            email: credentials.email,
            isDeleted: false 
          }).select('+password');

          if (!teacher || !teacher.password) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            teacher.password
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: teacher._id.toString(),
            email: teacher.email,
            name: teacher.name,
            role: "teacher",
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/teacher/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  }
};
