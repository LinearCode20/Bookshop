export const runtime = "nodejs";

import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const baseUrl = process.env.BASE_URL || "http://localhost:3000";

// send email helper
const sendEmail = async (
  email: string,
  subject: string,
  emailType: string
) => {
  await fetch(`${baseUrl}/api/send-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      subject,
      emailType,
    }),
  });
};

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return new NextResponse("Missing signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  console.log("Webhook event type:", event.type);

  try {
    switch (event.type) {
      //  Payment Success
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const customerEmail = session.customer_details?.email ?? null;
        const transactionId = session.metadata?.transaction_id;

        if (!transactionId) break;

        const { error } = await supabase
          .from("transactions")
          .update({
            status: "paid",
            stripe_transaction_id: session.payment_intent as string,
            email: customerEmail,
          })
          .eq("transaction_id", transactionId);

        if (error) {
          console.error("DB Update error:", error);
          break;
        }

        if (customerEmail) {
          const mailType = `Access-Delivery*${transactionId}`;

          await Promise.allSettled([
            sendEmail(
              customerEmail,
              "Your Digital Edition is ready",
              "Purchase-Confirmed"
            ),
            sendEmail(
              customerEmail,
              "Access to your Digital Edition",
              mailType
            ),
          ]);
        }

        break;
      }

      //  Session Expired
      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;
        const transactionId = session.metadata?.transaction_id;
        const customerEmail = session.customer_details?.email ?? null;

        if (customerEmail) {
          await sendEmail(
            customerEmail,
            "Your payment could not be completed.",
            "Payment-failed"
          );
        }

        if (transactionId) {
          await supabase
            .from("transactions")
            .update({ status: "expired" })
            .eq("transaction_id", transactionId);
        }

        break;
      }

      //  Refund Success
      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        const email = charge.billing_details?.email;

        console.log("Webhook charge:", charge);
        console.log("Webhook email:", email);

        if (email) {
          await sendEmail(
            email,
            "Your refund has been processed.",
            "refund-success"
          );
        }

        break;
      }

      //  Refund Failed
      case "refund.failed": {
        const refund = event.data.object as Stripe.Refund;

        if (refund.charge) {
          const charge = await stripe.charges.retrieve(
            refund.charge as string
          );

          const email = charge.billing_details?.email;

          if (email) {
            await sendEmail(
              email,
              "Your refund request failed.",
              "refund-failed"
            );
          }
        }

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    //  Always return success to Stripe
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return new NextResponse("Webhook error", { status: 500 });
  }
}
