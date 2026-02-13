import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";
// import { sendEmail } from "@/lib/resend";
import fs from "fs";
import path from "path";
import {
  saveTransactionWithCheck,
  getAllSubscribedEmails,
} from "@/lib/subscribedEmails";

export async function POST(req: Request) {
  try {
    const { email: reqEmail, subject: reqSubject, emailType } = await req.json();

    // Initialize variables
    let email: string | string[] = reqEmail || "";
    let subject = reqSubject || "Default Subject";
    let pdfLink = "";
    let templatePath = "";
    let UnsubscribeUrl = "";

    // FIRST-CHAPTER email
    if (emailType === "First-Chapter") {
      pdfLink = `${process.env.BASE_URL}/pdfs/chapter-one.pdf`;

      const subscribeId = await saveTransactionWithCheck({
        email: typeof email === "string" ? email : email[0],
        subscribe_status: true,
        created_at: new Date().toISOString(),
      });

      UnsubscribeUrl = `${process.env.BASE_URL}/?status=Unsubscribe&tx=${subscribeId}`;
      templatePath = path.join(process.cwd(), "emails/free-chapter-one.html");

    // PURCHASE CONFIRMED
    } else if (emailType === "Purchase-Confirmed") {
      templatePath = path.join(process.cwd(), "emails/purchase-confirmation.html");
      pdfLink = `${process.env.BASE_URL}`;

    // PAYMENT FAILED
    } else if (emailType === "Payment-failed") {
      templatePath = path.join(process.cwd(), "emails/payment-faild.html");
      pdfLink = `${process.env.BASE_URL}`;

    // REFUND SUCCESS
    } else if (emailType === "refund-success") {
      templatePath = path.join(process.cwd(), "emails/refund-processed.html");
      pdfLink = `${process.env.BASE_URL}`;

    // Email types 1,2,3,4 (may send to multiple emails)
    } else if (["1", "2", "3", "4"].includes(emailType)) {

      // Fetch all subscribed emails if subject === "all"
      if (subject === "all") {
        const allEmails = await getAllSubscribedEmails();
        if (!allEmails || allEmails.length === 0) {
          throw new Error("NO_SUBSCRIBED_EMAILS");
        }
        email = allEmails;
      } else if (!Array.isArray(email)) {
        // ensure single email is an array for uniform processing
        email = [email];
      }

      // Set subject and template based on emailType
      if (emailType === "1") {
        subject = "Your refund request has been reviewed.";
        templatePath = path.join(process.cwd(), "emails/refund-declined.html");

      } else if (emailType === "2") {
        subject = "Thanks for getting in touch.";
        templatePath = path.join(
          process.cwd(),
          "emails/access-issue-resend-access-link.html"
        );

      } else if (emailType === "3") {
        subject = "We’ve received your message.";
        templatePath = path.join(
          process.cwd(),
          "emails/general-support-acknowledgement.html"
        );

      } else if (emailType === "4") {
        subject = "The Digital Edition is now live.";
        templatePath = path.join(process.cwd(), "emails/product-update.html");
      }

    // DEFAULT / ACCESS DELIVERY
    } else {
      const parts = emailType.split("*");
      const transactionIdValue = parts[1] ?? "";
      templatePath = path.join(process.cwd(), "emails/access-delivery.html");
      pdfLink = `${process.env.BASE_URL}?token=${transactionIdValue}`;
    }

    // Ensure template exists
    if (!templatePath) throw new Error("EMAIL_TEMPLATE_NOT_FOUND");

    // Read HTML template and replace placeholders
    const html = fs
      .readFileSync(templatePath, "utf8")
      .replace("{{PDF_LINK}}", pdfLink)
      .replace("{{UnsubscribeUrl}}", UnsubscribeUrl);

    // SEND EMAIL
    if (Array.isArray(email)) {
      for (const e of email) {
        await sendEmail({
          to: e,
          subject,
          html,
        });
      }
    } else {
      await sendEmail({
        to: email,
        subject,
        html,
      });
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    if (error.message === "EMAIL_ALREADY_EXISTS") {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 409 }
      );
    } else if (error.message === "NO_SUBSCRIBED_EMAILS") {
      return NextResponse.json(
        { success: false, message: "No subscribed emails found" },
        { status: 404 }
      );
    }

    console.error("POST /api/send-email error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
