import { NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/auth";

export async function GET() {
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

    return NextResponse.json({
      mfa_enabled: user.mfa_enabled,
      mfa_secret_exists: !!user.mfa_secret,
    });
  } catch (error) {
    console.error("2FA status error:", error);
    return NextResponse.json({ error: "Failed to get 2FA status" }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
