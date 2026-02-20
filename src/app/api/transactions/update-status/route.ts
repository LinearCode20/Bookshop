import { NextResponse } from "next/server";
import { updateTransactionStatus } from "@/lib/transactions";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tx = searchParams.get("tx");
  const status = searchParams.get("status");

  if (!tx || !status) {
    return NextResponse.json({ status: "invalid" }, { status: 400 });
  }

  try {
    const updated = await updateTransactionStatus(tx, status);

    if (!updated || (Array.isArray(updated) && updated.length === 0)) {
      return NextResponse.json({ status: "not_found" }, { status: 404 });
    }

    return NextResponse.json({ status: "updated" });
  } catch (err) {
    console.error("Error updating transaction status:", err);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
