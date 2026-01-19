import Stripe from "stripe";
import { NextResponse } from "next/server";
import { updateTransactionStatus } from "@/lib/transactions";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    if (!sig) {
        return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err) {
        console.error("Webhook signature verification failed.", err);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    try {
        await handleStripeEvent(event);
    } catch (err) {
        // IMPORTANT: still return 200 to prevent endless retries
        console.error("Webhook processing error:", err);
    }

    return NextResponse.json({ received: true });
}

async function handleStripeEvent(event: Stripe.Event) {
    let transactionId: string | undefined;
    console.log('stripe event', event);
    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;
            transactionId = session.metadata?.transaction_id;
            const stripeTransactionId = "";

            if (!transactionId) {
                console.warn("Missing transaction_id in checkout.session.completed");
                return;
            }

            await updateTransactionStatus(transactionId, "paid", stripeTransactionId);
            break;
        }

        case "checkout.session.expired": {
            const session = event.data.object as Stripe.Checkout.Session;
            transactionId = session.metadata?.transaction_id;
            const stripeTransactionId = "";

            if (!transactionId) {
                console.warn("Missing transaction_id in checkout.session.expired");
                return;
            }

            await updateTransactionStatus(transactionId, "expired", stripeTransactionId);
            break;
        }

        case "charge.refunded": {
            const charge = event.data.object as Stripe.Charge;
            transactionId = charge.metadata?.transaction_id;
            const stripeTransactionId = "";

            if (!transactionId) {
                console.warn("Missing transaction_id in charge.refunded");
                return;
            }

            await updateTransactionStatus(transactionId, "refunded", stripeTransactionId);
            break;
        }

        default:
            // Ignore unhandled events
            return;
    }
}
