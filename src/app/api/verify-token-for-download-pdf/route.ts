import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/server";

export async function POST(req: Request) {
    try {
        const { token } = await req.json();

        if (!token) {
            return NextResponse.json(
                { valid: false, reason: "Missing token" },
                { status: 400 }
            );
        }

        // Fetch transaction from Supabase
        const { data, error } = await supabase
            .from("transactions")
            .select("download_expiry, status")
            .eq("transaction_id", token)
            .single();

        if (error || !data) {
            return NextResponse.json({ valid: false, reason: "Token not found" });
        }
        const expiryDate = new Date(data.download_expiry);

        // Check if expired
        const isExpired = expiryDate.getTime() < Date.now();

        // Only allow if status is paid and not expired
        if (data.status !== "paid" || isExpired) {
            return NextResponse.json({ valid: false, reason: "Token is Expired." });
        }

        return NextResponse.json({
            valid: true,
            downloadUrl: "/pdfs/full-book.pdf",
        });

    } catch (err) {
        console.error("Error verifying token:", err);
        return NextResponse.json({ valid: false, reason: "Server error" }, { status: 500 });
    }
}
