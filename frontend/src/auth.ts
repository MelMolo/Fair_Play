// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { getUser } from "./lib/fetch/admin";

// // const credentials = {
// //   email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
// //   password: { label: "Password", type: "text" },
// // };

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       authorize: async (
//         credentials: { email?: string; password?: string } | undefined
//       ) => {
//         const email = credentials?.email ?? "";
//         const password = credentials?.password ?? "";

//         // Attempt to get the user with the email and password
//         const user = await getUser(email, password);
//         console.log("User authorized:", user);

//         if (!user) {
//           console.error("Invalid Credentials");
//           throw new Error("Invalid credentials.");
//         }

//         // Return user object to be saved in the session
//         return user;
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//     signOut: "/",
//   },

//   // Optional: session and callbacks here if needed
//   session: {
//     strategy: "jwt",
//   },

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.email = user.email;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.email = token?.email ?? "";
//       return session;
//     },
//   },
// });

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { getUser } from "./lib/fetch/admin";

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email = "", password = "" } = credentials as {
          email?: string;
          password?: string;
        };

        const user = await getUser(email, password);
        if (user) return user;

        console.error("Invalid credentials");
        return null;
      },
    }),
  ],
});
