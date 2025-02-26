"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
  session?: any; // Add session prop
};

export function SessionProvider({ children, session }: Props) {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
}
