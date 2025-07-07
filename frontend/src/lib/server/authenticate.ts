"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const login = async (
  prevState: string | undefined,
  formData: { email: string; password: string }
) => {
  try {
    await signIn("credentials", {
      ...formData,
      redirect: true,
      callbackUrl: "/admin", // Redirect after successful sign-in
    });

    // return "success";
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        // case "CallbackRouteError":
        //   return ". Check email or password and try again";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
};
