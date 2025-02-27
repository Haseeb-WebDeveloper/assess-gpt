import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
    instituteId?: string;
  }

  interface Session {
    user: {
      role?: string;
      instituteId?: string;
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    instituteId?: string;
  }
} 