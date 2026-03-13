"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function MFASetupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<"setup" | "verify">("setup");
  const [loading, setLoading] = useState(false);
  const [secret, setSecret] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    // Get 'from' from URL params
    const fromParam = searchParams.get("from");

    // Verify user came from login
    if (fromParam !== "login") {
      // Allow direct access for testing, but ideally should redirect
    }
  }, [searchParams]);

  // Step 1: Generate secret and QR code
  const handleSetup = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/2fa/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      const data = await res.json();

      if (res.ok) {
        setSecret(data.secret);
        setQrCode(data.qrCode);
        setStep("verify");
      } else {
        toast.error(data.error || "Failed to setup 2FA");
      }
    } catch (error) {
      toast.error("Failed to setup 2FA");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify token and enable 2FA
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || token.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    setLoading(true);
    try {
      // First verify the token
      const verifyRes = await fetch("/api/auth/2fa/enable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, token }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok) {
        toast.error(verifyData.error || "Invalid code");
        setLoading(false);
        return;
      }

      // Then enable 2FA
      const enableRes = await fetch("/api/auth/2fa/enable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, token }),
      });

      const enableData = await enableRes.json();

      if (enableRes.ok) {
        toast.success("2FA enabled successfully!");
        // Redirect to verify page to complete login
        setTimeout(() => {
          router.push(`/custom-action?success=mfa-enabled`);
        }, 1500);
      } else {
        toast.error(enableData.error || "Failed to enable 2FA");
      }
    } catch (error) {
      toast.error("Failed to verify code");
    } finally {
      setLoading(false);
    }
  };

  const copySecret = () => {
    navigator.clipboard.writeText(secret);
    toast.success("Secret copied to clipboard");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">
            {step === "setup"
              ? "Setup Two-Factor Authentication"
              : "Verify 2FA"}
          </CardTitle>
          <CardDescription className="text-zinc-400">
            {step === "setup"
              ? "Setup 2FA to complete your login"
              : "Enter the code from your authenticator app"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === "setup" && (
            <div className="space-y-4">
              <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 text-sm text-zinc-300">
                <p className="mb-2">
                  You'll need an authenticator app like Google Authenticator,
                  Authy, or 1Password.
                </p>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>Install an authenticator app on your phone</li>
                  <li>Click the button below to generate a QR code</li>
                  <li>Scan the QR code with your app</li>
                  <li>Enter the 6-digit code to verify</li>
                </ol>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={loading}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSetup}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? "Generating..." : "Generate QR Code"}
                </Button>
              </div>
            </div>
          )}

          {step === "verify" && (
            <form onSubmit={handleVerify} className="space-y-6">
              {/* QR Code */}
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-lg">
                  <img src={qrCode} alt="QR Code" className="w-48 h-48" />
                </div>
              </div>

              {/* Manual Entry */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">
                  Or enter this code manually:
                </label>
                <div className="flex gap-2">
                  <code className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-xs text-zinc-300 font-mono overflow-x-auto">
                    {secret}
                  </code>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={copySecret}
                    className="shrink-0"
                  >
                    Copy
                  </Button>
                </div>
              </div>

              {/* Token Input */}
              <div className="space-y-2">
                <label
                  htmlFor="token"
                  className="text-sm font-medium text-zinc-300"
                >
                  Enter 6-digit code
                </label>
                <input
                  id="token"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={token}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setToken(value.slice(0, 6));
                  }}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-3 text-center text-2xl tracking-widest text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="000000"
                  autoFocus
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setStep("setup");
                    setToken("");
                  }}
                  disabled={loading}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={loading || token.length !== 6}
                  className="flex-1"
                >
                  {loading ? "Verifying..." : "Enable 2FA"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function MFASetupPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-black">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <MFASetupContent />
    </Suspense>
  );
}
