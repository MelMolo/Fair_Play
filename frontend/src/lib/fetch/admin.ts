/* eslint-disable  @typescript-eslint/no-explicit-any */

import { User } from "next-auth";

const testPassword = "677147924";
const testEmail = "treezyvarrick@gmail.com";

export async function getUser(
  email: string,
  password: string
): Promise<User | null> {
  try {
    const dataToSend = { email, password };

    console.table(dataToSend);
    console.log(testEmail, testPassword);
    console.log(email === testEmail);
    console.log(password === testPassword);

    if (email === testEmail && password === testPassword) {
      return { email: email, id: email };
    }

    return null;
  } catch (error: any) {
    console.error("Failed to fetch user:", error);
    throw new Error(error?.message ?? "Something went wrong");
  }
}
