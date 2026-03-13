import { NextResponse } from "next/server";
import speakeasy from "speakeasy";
import { getUserByEmail, updateUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { token, secret } = await req.json();
    
    const email = process.env.ADMIN_EMAIL;
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!token || !secret) {
      return NextResponse.json(
        { error: "Token and secret are required" },
        { status: 400 },
      );
    }

    // Verify the token before enabling 2FA
    const isValid = speakeasy.totp.verify({
      secret: secret,
      encoding: "base32",
      token: token,
      window: 2,
    });

    if (!isValid) {
      return NextResponse.json({ error: "Invalid 2FA token" }, { status: 401 });
    }

    // Fetch user info from lib/auth
    let user;
    try {
      user = await getUserByEmail(email);
    } catch {
      // User doesn't exist, return error instead of creating
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update existing user with 2FA settings
    await updateUser(user.id, {
      mfa_secret: secret,
      mfa_enabled: true,
    });

    return NextResponse.json({
      success: true,
      message: "2FA enabled successfully",
    });
  } catch (error) {
    console.error("2FA enable error:", error);
    return NextResponse.json(
      { error: "Failed to enable 2FA" },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
