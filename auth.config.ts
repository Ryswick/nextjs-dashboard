import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
    // In pages you could also put sign-out, error pages etc
    // Setting signIn here brings the user to our custom login page
    // Rather than the NextAuth.js default one
  },
  callbacks: {
    // used to verify if the request is authorized to access a page with Next.js Proxy
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [], // array where you list different login options
} satisfies NextAuthConfig;
