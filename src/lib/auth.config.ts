import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { IndividualTeacher } from "@/database/model/individual-teacher.model";
import PlatformAdmin from "@/database/model/platform-admin.model";
import { connectToDatabase } from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
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
    }),
    CredentialsProvider({
      id: "platform-admin-credentials",
      name: "Platform Admin",
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

          const admin = await PlatformAdmin.findOne({ 
            email: credentials.email 
          });

          if (!admin || !admin.password) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            admin.password
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: admin._id.toString(),
            email: admin.email,
            name: admin.name,
            role: "platform-admin",
            permissions: admin.permissions,
          };
        } catch (error) {
          console.error("Admin auth error:", error);
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
        if (user.role === "platform-admin") {
          token.permissions = user.permissions;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        if (token.role === "platform-admin") {
          session.user.permissions = token.permissions as string[];
        }
      }
      return session;
    }
  }
};
