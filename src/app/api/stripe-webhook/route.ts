// app/api/stripe-webhook/route.ts
import Stripe from "stripe";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const filePath = path.join(process.cwd(), "transactions.json");

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const tx = session.metadata?.transaction_id;

    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const index = data.findIndex((d: any) => d.transaction_id === tx);
    
    if (index !== -1) {
        console.log('data',data[index]);

      data[index].status = "paid";
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
  }

  return NextResponse.json({ received: true });
}
