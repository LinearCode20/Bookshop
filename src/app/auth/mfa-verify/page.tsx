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

function MFAVerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [from, setFrom] = useState<"setup" | "login" | null>(null);

  useEffect(() => {
    // Get from param
    const fromParam = searchParams.get("from");

    // Check where user came from
    if (fromParam === "setup" || fromParam === "login") {
      setFrom(fromParam);
    } else {
      // Invalid source, redirect to login
      router.push("/login");
    }
  }, [searchParams, router]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || token.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/2fa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Login successful!");
        setTimeout(() => {
          router.push("/custom-action");
        }, 500);
      } else {
        toast.error(data.error || "Invalid code");
        setToken("");
      }
    } catch (error) {
      toast.error("Failed to verify code");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/login");
  };

  const getTitle = () => {
    if (from === "setup") {
      return "Complete Your Login";
    }
    return "Two-Factor Authentication";
  };

  const getDescription = () => {
    if (from === "setup") {
      return "2FA setup complete! Enter your code to finish logging in";
    }
    return "Enter the 6-digit code from your authenticator app to complete login";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">{getTitle()}</CardTitle>
          <CardDescription className="text-zinc-400">
            {getDescription()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-6">
            {/* Token Input */}
            <div className="space-y-2">
              <label
                htmlFor="token"
                className="text-sm font-medium text-zinc-300"
              >
                Authentication Code
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
              <p className="text-xs text-zinc-500">
                Open your authenticator app (Google Authenticator, Authy, etc.)
                to view your code
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={loading}
                className="flex-1"
              >
                Back to Login
              </Button>
              <Button
                type="submit"
                disabled={loading || token.length !== 6}
                className="flex-1"
              >
                {loading ? "Verifying..." : "Verify & Login"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function MFAVerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-black">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <MFAVerifyContent />
    </Suspense>
  );
}
