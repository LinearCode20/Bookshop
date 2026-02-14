"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname(); // safer than window.location

  const [password, setPassword] = useState("");

  const success = searchParams.get("success");
  const error = searchParams.get("error");

  useEffect(() => {
    if (!error && !success) return;

    if (error === "unauthorized") {
      toast.error("You must login to access that page.");
    }

    if (success === "logout") {
      toast.success("Logged out successfully.");
    }

    // Remove query params safely
    const url = new URL(window.location.href);
    url.searchParams.delete("error");
    url.searchParams.delete("success");

    // Or replace the URL with only the pathname
    router.replace(pathname);

  }, [error, success, pathname, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/custom-action");
    } else {
      toast.error("Invalid password.");
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
