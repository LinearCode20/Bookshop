export const runtime = "nodejs";
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// send email
const sendEmail = async (Email: string, Subject: string, Type: string) => {
    const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: Email,
            subject: Subject,
            type: Type
        }),
    });

    const data = await res.json();
    // if (res.ok || data.success) {
    //     // Open Chapter 1 PDF in new tab
    //     window.open("/pdfs/chapter-one.pdf", "_blank", "noopener,noreferrer");
    // }
};

export async function POST(req: Request) {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature")!;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            endpointSecret
        );
    } catch (err) {
        console.error("Webhook signature verification failed.");
        return new NextResponse("Invalid signature", { status: 400 });
    }

    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;
            const customerEmail = session.customer_details?.email ?? null;
            const transactionId = session.metadata?.transaction_id;
            console.log('session', session);
            if (!transactionId) break;

            const { error } = await supabase
                .from("transactions")
                .update({
                    status: "paid",
                    stripe_transaction_id: session.payment_intent as string,
                    email: customerEmail as string
                })
                .eq("transaction_id", transactionId);

            // check email and throe email
            if (customerEmail) {
                const mailType = `Full-Book*${transactionId}`;
                const emailSubject = 'Your Free Ebook - LET ME GIVE YOU THE GAME!';
                sendEmail(customerEmail, emailSubject, mailType);
            }

            if (error) {
                console.error("Update error:", error);
                return new NextResponse("DB error", { status: 500 });
            }

            break;
        }

        case "checkout.session.expired": {
            const session = event.data.object as Stripe.Checkout.Session;
            const transactionId = session.metadata?.transaction_id;

            if (!transactionId) break;

            await supabase
                .from("transactions")
                .update({ status: "expired" })
                .eq("transaction_id", transactionId);

            break;
        }
    }

    return NextResponse.json({ received: true });
}
