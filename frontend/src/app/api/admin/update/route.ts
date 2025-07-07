import { auth } from "@/auth";
import { updateAdmin } from "@/lib/data/admins";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { newEmail, newPassword } = await req.json();

  if (!newEmail && !newPassword) {
    return NextResponse.json(
      { message: "No updates provided" },
      { status: 400 }
    );
  }

  const success = updateAdmin(session.user.email, newEmail, newPassword);

  if (!success) {
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({ message: "Account updated successfully" });
}
