"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import EmailModal from "@/components/first-chapter/read-first-chapter-popup";

export default function Home() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [open, setOpen] = useState(false);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (!token) return;

    const verifyToken = async () => {
      const res = await fetch("/api/verify-token-for-download-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (data.valid) {
        // ✅ Auto download
        const link = document.createElement("a");
        link.href = data.downloadUrl;
        link.download = "full-book.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // ❌ Expired / invalid
        setExpired(true);
        setOpen(true);
      }
    };

    verifyToken();
  }, [token]);

  return (
    <main>
      <section className="container text-center">
        <h1>LET ME GIVE YOU THE GAME</h1>

        <Button onClick={() => setOpen(true)}>
          [ READ CHAPTER ONE ]
        </Button>

        <EmailModal
          isOpen={open}          
          onClose={() => setOpen(false)}
          expired={expired}
        />
      </section>
    </main>
  );
}
