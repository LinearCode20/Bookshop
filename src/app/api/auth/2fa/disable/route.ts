import { NextResponse } from "next/server";
import { getUserByEmail, updateUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    // Use ADMIN_EMAIL from environment variable
    const email = process.env.ADMIN_EMAIL;

    if (!email) {
      return NextResponse.json(
        { error: "ADMIN_EMAIL environment variable is not configured" },
        { status: 500 }
      );
    }

    // Get user from database
    const user = await getUserByEmail(email);

    // Update user's 2FA status to disabled
    await updateUser(user.id, { mfa_enabled: false });

    return NextResponse.json({
      success: true,
      message: "2FA disabled successfully",
      mfa_enabled: false,
    });
  } catch (error) {
    console.error("2FA disable error:", error);
    return NextResponse.json({ error: "Failed to disable 2FA" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
