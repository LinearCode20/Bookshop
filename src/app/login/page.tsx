"use client"; // must be first line

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import toast from "react-hot-toast";

export function InnerLoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [password, setPassword] = useState("");

  useEffect(() => {
    const success = searchParams.get("success");
    const error = searchParams.get("error");

    if (!error && !success) return;

    if (error === "unauthorized") {
      toast.error("You must login to access that page.");
    }

    if (success === "logout") {
      // toast.success("Logged out successfully.");
    }

    // Remove query params safely without using window
    router.replace("/login");
  }, [searchParams, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!password) {
        toast.error("Please enter password");
        return;
      }

      const res = await axios.post("/api/login", {
        password,
      });
      console.log("res", res);
      const data = res.data;

      if (data.verifyRequired) {
        router.push("/auth/mfa-verify?from=login");
      } else {
        toast.success("Logged in successfully.");
        setTimeout(() => {
          router.push("/custom-action");
        }, 500);
      }
    } catch (e) {
      console.log(e);

      toast.error("Invalid credentials.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center space-y-6">
        <h1 className="text-2xl tracking-widest">Login</h1>

        <form onSubmit={handleLogin} className="flex gap-4 justify-center">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-80 bg-black border border-white px-4 py-2 text-white"
          />
          <button type="submit" className="bg-white text-black px-6 py-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <>
      <Suspense fallback={null}>
        <InnerLoginPage></InnerLoginPage>
      </Suspense>
    </>
  );
}
