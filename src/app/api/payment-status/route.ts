// app/api/payment-status/route.ts
// import { NextResponse } from "next/server";
// import { getTransactionById } from "@/lib/transactions";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const tx = searchParams.get("tx");

//   if (!tx) {
//     return NextResponse.json({ error: "Missing tx" }, { status: 400 });
//   }

//   const transaction = await getTransactionById(tx);

//   return NextResponse.json({
//     status: transaction?.status ?? "pending",
//   });
// }
