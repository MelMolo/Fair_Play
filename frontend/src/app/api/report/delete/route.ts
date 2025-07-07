import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { deleteReport } from "@/lib/data/reports";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || !session.user?.email)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();

  if (!id)
    return NextResponse.json(
      { message: "Report ID is required" },
      { status: 400 }
    );

  deleteReport(id, session.user.email); // email is acting as userId

  return NextResponse.json({ message: "Report deleted", id });
}
