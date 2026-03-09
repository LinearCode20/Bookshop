// app/HomeClient.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import EmailModal from "@/components/first-chapter/read-first-chapter-popup";

export default function HomeClient() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [expired, setExpired] = useState(false);

    const [open, setOpen] = useState(expired);

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
                //  Auto download
                const link = document.createElement("a");
                link.href = data.downloadUrl;
                link.download = "full-book.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                // Expired / invalid
                setExpired(true);
                setOpen(true);
            }
        };

        verifyToken();
    }, [token]);

    return (

        <EmailModal
            isOpen={open}
            onClose={() => setOpen(false)}
            expired={expired}
        />

    );
}
