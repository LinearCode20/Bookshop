// app/api/create-checkout-session/route.ts
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { saveTransaction } from "@/lib/transactions";
import crypto from "crypto";

const BASE_URL = process.env.BASE_URL??"";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const expiryHours = Number(process.env.URL_EXPIRY_HOURS ?? 1);
const PRICE_ID = process.env.PRICE_ID as string ?? "" ;

export async function POST() {
    const transactionId = crypto.randomUUID();

    const createdAt = new Date();
    const expiryDate = new Date(
    createdAt.getTime() + expiryHours * 60 * 60 * 1000
    );

    saveTransaction({
        transaction_id: transactionId,
        status: "pending",
        url: "xyz.com",
        expiry: expiryDate.toISOString(),
        created_at: createdAt.toISOString(),
    });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      { price: PRICE_ID, quantity: 1 },
    ],
    
    success_url: `${BASE_URL}/book?status=success&tx=${transactionId}`,
    cancel_url: `${BASE_URL}/book?status=canceled&tx=${transactionId}`,
    metadata: {
      transaction_id: transactionId,
    },
  });

  return NextResponse.json({ url: session.url });
}
