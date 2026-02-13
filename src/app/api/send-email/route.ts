import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";
// import { sendEmail } from "@/lib/resend";
import fs from "fs";
import path from "path";
import { saveTransactionWithCheck, getAllSubscribedEmails } from "@/lib/subscribedEmails";

export async function POST(req: Request) {
  try {
    const { email: reqEmail, subject: reqSubject, emailType } = await req.json();

    // Initialize variables
    let email: string | string[] = reqEmail || "";
    let subject = reqSubject || "Default Subject";
    let pdfLink = "";
    let templatePath = "";
    let UnsubscribeUrl = "";

    // First-Chapter
    if (emailType === "First-Chapter") {
      pdfLink = `${process.env.BASE_URL}/pdfs/chapter-one.pdf`;

      const subscribeId = await saveTransactionWithCheck({
        email,
        subscribe_status: true,
        created_at: new Date().toISOString(),
      });

      UnsubscribeUrl = `${process.env.BASE_URL}/?status=Unsubscribe&tx=${subscribeId}`;

      templatePath = path.join(process.cwd(), "emails/free-chapter-one.html");

    // Purchase confirmed
    } else if (emailType === "Purchase-Confirmed") {
      templatePath = path.join(process.cwd(), "emails/purchase-confirmation.html");
      pdfLink = `${process.env.BASE_URL}`;

    // Payment failed
    } else if (emailType === "Payment-failed") {
      templatePath = path.join(process.cwd(), "emails/payment-faild.html");
      pdfLink = `${process.env.BASE_URL}`;

    // Refund success
    } else if (emailType === "refund-success") {
      templatePath = path.join(process.cwd(), "emails/refund-processed.html");
      pdfLink = `${process.env.BASE_URL}`;

    // Email types 1,2,3,4 (may send to multiple emails)
    } else if (["1", "2", "3", "4"].includes(emailType)) {

      // Fetch all emails from DB if subject === "all"
      if (subject === "all") {
        email = await getAllSubscribedEmails(); // fetch array of emails from DB
        if (!email || email.length === 0) {
          throw new Error("NO_SUBSCRIBED_EMAILS");
        }
      } else if (!Array.isArray(email)) {
        email = [email]; // ensure single email becomes array
      }

      if (emailType === "1") {
        subject = "Your refund request has been reviewed.";
        templatePath = path.join(process.cwd(), "emails/refund-declined.html");

      } else if (emailType === "2") {
        subject = "Thanks for getting in touch.";
        templatePath = path.join(process.cwd(), "emails/access-issue-resend-access-link.html");

      } else if (emailType === "3") {
        subject = "We’ve received your message.";
        templatePath = path.join(process.cwd(), "emails/general-support-acknowledgement.html");

      } else if (emailType === "4") {
        subject = "The Digital Edition is now live.";
        templatePath = path.join(process.cwd(), "emails/product-update.html");
      }

    // Default / Access Delivery emails
    } else {
      const parts = emailType.split("*");
      const transactionIdValue = parts[1] ?? "";

      templatePath = path.join(process.cwd(), "emails/access-delivery.html");
      pdfLink = `${process.env.BASE_URL}?token=${transactionIdValue}`;
    }

    // Ensure template exists
    if (!templatePath) throw new Error("EMAIL_TEMPLATE_NOT_FOUND");

    const html = fs
      .readFileSync(templatePath, "utf8")
      .replace("{{PDF_LINK}}", pdfLink)
      .replace("{{UnsubscribeUrl}}", UnsubscribeUrl);

    // Send email
    await sendEmail({
      to: email, // string or array
      subject,
      html,
    });

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

    return NextResponse.json({ success: false }, { status: 500 });
  }
}
