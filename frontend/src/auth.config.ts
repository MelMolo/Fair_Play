/* eslint-disable @typescript-eslint/no-unused-vars */

import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnTest = nextUrl.pathname.startsWith("/test");
      const isOnAdminPage = nextUrl.pathname.startsWith("/admin");
      if (isOnAdminPage) {
        return isLoggedIn;
      } else if (isLoggedIn && !isOnTest) {
        return Response.redirect(new URL("/admin", nextUrl));
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        // Initial sign in
        token.id = user.email;
        token.email = user.email;
      }

      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          emailVerified: null,
        };
      }
      return session;
    },
  },
  providers: [], // extended providers in auth.ts

  // Automatically expire the session after 11 days
  session: {
    maxAge: 11 * 24 * 60 * 60, // 11 days in seconds
  },
} satisfies NextAuthConfig;
