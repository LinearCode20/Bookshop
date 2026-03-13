import { NextResponse } from "next/server";
import speakeasy from "speakeasy";
import QRCode from "qrcode";

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

    // Generate a unique secret for the admin
    const secret = speakeasy.generateSecret({
      name: `Book Shop (${email})`,
      issuer: "Book Shop",
      length: 32,
    });

    // Generate QR code as base64 data URL
    const qrCodeDataUrl = await QRCode.toDataURL(secret.otpauth_url!, {
      width: 300,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    });

    // Return the secret and QR code
    return NextResponse.json({
      secret: secret.base32,
      qrCode: qrCodeDataUrl,
      message: "2FA setup initialized. Please verify with your authenticator app.",
    });
  } catch (error) {
    console.error("2FA setup error:", error);
    return NextResponse.json({ error: "Failed to setup 2FA" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
