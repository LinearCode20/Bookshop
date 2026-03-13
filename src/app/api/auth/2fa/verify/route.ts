import { NextRequest, NextResponse } from "next/server";
import speakeasy from "speakeasy";
import { getUserByEmail } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    // Read the request to get cookies
    const cookie = req.cookies.get("mfa_pending_user");

    if (!cookie) {
      return NextResponse.json(
        { error: "No session found. Please login again." },
        { status: 401 },
      );
    }
    const pendingUserEmail = decodeURIComponent(cookie.value);

    if (!pendingUserEmail) {
      return NextResponse.json(
        { error: "Session expired. Please login again." },
        { status: 401 },
      );
    }

    // Fetch user from database to get mfa_secret
    const user = await getUserByEmail(pendingUserEmail);

    if (!user.mfa_enabled || !user.mfa_secret) {
      return NextResponse.json(
        { error: "MFA not enabled for this user" },
        { status: 400 },
      );
    }

    // Verify the token using the secret from database
    const isValid = speakeasy.totp.verify({
      secret: user.mfa_secret,
      encoding: "base32",
      token: token,
      window: 2, // Allow 2 time steps before and after for clock drift
    });

    if (isValid) {
      // Create response and set auth cookie
      const response = NextResponse.json({
        success: true,
        message: "2FA token verified successfully",
      });

      // Set authentication cookie
      response.cookies.set("admin_auth", "authorized", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      });

      // Delete the temporary mfa_pending_user cookie
      response.cookies.delete("mfa_pending_user");

      return response;
    } else {
      return NextResponse.json({ error: "Invalid 2FA token" }, { status: 401 });
    }
  } catch (error) {
    console.error("2FA verify error:", error);
    return NextResponse.json(
      { error: "Failed to verify 2FA" },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
