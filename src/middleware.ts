import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ token }) {
      return !!token; // Only allow authenticated users
    },
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*", // Protect all dashboard routes
  ],
};
