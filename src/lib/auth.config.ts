import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import InstituteAdmin from "@/database/model/institute-admin.model";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password || !credentials?.role) {
          throw new Error("Missing credentials");
        }

        try {
          await connectToDatabase();

          // Handle different role-based authentications
          if (credentials.role === "institute_admin") {
            const admin = await InstituteAdmin.findOne({ 
              email: credentials.email 
            }).select("+password");

            if (!admin) {
              throw new Error("Invalid credentials");
            }

            const isValid = await bcrypt.compare(
              credentials.password,
              admin.password
            );

            if (!isValid) {
              throw new Error("Invalid credentials");
            }

            return {
              id: admin._id.toString(),
              email: admin.email,
              role: "institute_admin",
              instituteId: admin.instituteId.toString(),
            };
          }

          // Add other role authentications here (platform_admin, teacher, etc.)
          throw new Error("Invalid role");
        } catch (error: any) {
          console.error("Auth error:", error);
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.instituteId = user.instituteId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role;
        session.user.instituteId = token.instituteId;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};
