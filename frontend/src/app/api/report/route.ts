import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getAllReports } from "@/lib/data/reports";

export async function GET() {
  const session = await auth();

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const reports = getAllReports(session.user.email); // Pass email as userId
  return NextResponse.json({ reports });
}
