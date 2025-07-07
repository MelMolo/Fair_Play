import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { addReport } from "@/lib/data/reports";

export async function POST(req: NextRequest) {
  //   const session = await auth();
  //   if (!session)
  //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const report = {
    ...body,
    id: uuidv4(),
    date: new Date().toISOString(),
  };

  addReport(report);

  return NextResponse.json({ message: "Report added", report });
}
