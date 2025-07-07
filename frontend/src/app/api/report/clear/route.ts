import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { deleteAllReports } from "@/lib/data/reports";

export async function POST() {
  const session = await auth();
  const id = session?.user?.email ?? "";
  if (!session || !id)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  deleteAllReports(id); // assuming email = admin ID

  return NextResponse.json({ message: "All reports deleted" });
}
