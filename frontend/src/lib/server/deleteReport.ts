/* eslint-disable  @typescript-eslint/no-unused-vars */

"use server";

import { revalidatePath } from "next/cache";

export type FakeResponse = {
  success: boolean;
  message?: string;
};
const res: FakeResponse = {
  success: true,
  message: "Success!",
};

export async function deleteReport(id: string): Promise<FakeResponse> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(res);
      revalidatePath("/admin");
    }, 1000)
  );
}
