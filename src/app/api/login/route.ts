import { NextResponse } from "next/server";
import { getUserByEmail, verifyPassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    // Use ADMIN_EMAIL from environment variable
    const email = process.env.ADMIN_EMAIL;

    if (!email) {
      return NextResponse.json(
        { error: "ADMIN_EMAIL environment variable is not configured" },
        { status: 500 },
      );
    }

    // Get user from database
    const user = await getUserByEmail(email);

    // Check if user has a password set
    if (!user.password) {
      return NextResponse.json(
        { error: "No password set for this user" },
        { status: 401 },
      );
    }

    // Verify password using bcrypt
    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if user has 2FA enabled
    if (user.mfa_enabled && user.mfa_secret) {
      // User has 2FA enabled - require verification
      const response = NextResponse.json({
        verifyRequired: true,
        message: "Password correct. Please enter your 2FA code.",
      });

      // Set temporary cookie with user email for verify API
      response.cookies.set("mfa_pending_user", user.email, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 5, // 5 minutes - short lived
      });

      return response;
    }

    // MFA is disabled - allow direct login
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      userId: user.id,
    });

    // Set authentication cookie
    response.cookies.set("admin_auth", "authorized", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    // Handle user not found error
    if (error instanceof Error && error.message.includes("User not found")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Handle other errors
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
