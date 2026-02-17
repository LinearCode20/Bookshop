import { NextResponse } from "next/server";
//import { sendEmail } from "@/lib/mailer";
import { sendEmail } from "@/lib/resend";
import fs from "fs";
import path from "path";
import {
  saveTransactionWithCheck,
  getAllSubscribedEmails,
  getAllPurchasersEmails,
} from "@/lib/subscribedEmails";

export async function POST(req: Request) {
  try {
    const { email: reqEmail, subject: reqSubject, emailType } = await req.json();

    // Initialize variables
    let email: string | string[] = reqEmail || "";
    let subject = reqSubject || "Default Subject";
    let pdfLink = "";
    let templatePath = "";
    let unsubscribeUrl = "";
    let attachments = [];

    // Handle different email types

    if (emailType === "First-Chapter") {
      // FREE CHAPTER EMAIL
      pdfLink = `${process.env.BASE_URL}/pdfs/chapter-one.pdf`;

      const subscribeId = await saveTransactionWithCheck({
        email: typeof email === "string" ? email : email[0],
        subscribe_status: true,
        created_at: new Date().toISOString(),
      });

      unsubscribeUrl = `${process.env.BASE_URL}/?status=Unsubscribe&tx=${subscribeId}`;
      templatePath = path.join(process.cwd(), "emails/free-chapter-one.html");

      // Add attachment
      attachments = [
        {
          filename: "chapter-one.pdf",
          path: path.join(process.cwd(), "public/pdfs/chapter-one.pdf"),
        }
      ];

    } else if (emailType === "Purchase-Confirmed") {
      templatePath = path.join(process.cwd(), "emails/purchase-confirmation.html");
      pdfLink = `${process.env.BASE_URL}`;

    } else if (emailType === "Payment-failed") {
      templatePath = path.join(process.cwd(), "emails/payment-failed.html");
      pdfLink = `${process.env.BASE_URL}`;

    } else if (emailType === "refund-success") {
      templatePath = path.join(process.cwd(), "emails/refund-processed.html");
      pdfLink = `${process.env.BASE_URL}`;

    } else if (["1", "2", "3", "4"].includes(emailType)) {
      // EMAIL TYPES 1-4
      if (subject === "all-subscribers" || subject === "all-purchasers") {
        let allEmails: string[] = [];
        if (subject === "all-subscribers") {
          allEmails = await getAllSubscribedEmails();
        } else if (subject === "all-purchasers") {
          allEmails = await getAllPurchasersEmails();
        }

        // Filter out empty or null emails
        allEmails = allEmails.filter((e) => e && e.trim() !== "");

        if (!allEmails || allEmails.length === 0) {
          throw new Error("NO_SUBSCRIBED_EMAILS");
        }

        email = allEmails;
      } else if (!Array.isArray(email)) {
        email = [email];
      }

      // Set subject and template for each emailType
      switch (emailType) {
        case "1":
          subject = "Your refund request has been reviewed.";
          templatePath = path.join(process.cwd(), "emails/refund-declined.html");
          break;
        case "2":
          subject = "Thanks for getting in touch.";
          templatePath = path.join(
            process.cwd(),
            "emails/access-issue-resend-access-link.html"
          );
          break;
        case "3":
          subject = "We’ve received your message.";
          templatePath = path.join(
            process.cwd(),
            "emails/general-support-acknowledgement.html"
          );
          break;
        case "4":
          subject = "The Digital Edition is now live.";
          templatePath = path.join(process.cwd(), "emails/product-update.html");
          break;
      }

    } else {
      // DEFAULT / ACCESS DELIVERY
      const parts = emailType.split("*");
      const transactionIdValue = parts[1] ?? "";
      templatePath = path.join(process.cwd(), "emails/access-delivery.html");
      pdfLink = `${process.env.BASE_URL}?token=${transactionIdValue}`;
    }

    // Ensure template exists
    if (!templatePath || !fs.existsSync(templatePath)) {
      throw new Error("EMAIL_TEMPLATE_NOT_FOUND");
    }

    // Read HTML template
    const html = fs
      .readFileSync(templatePath, "utf8")
      .replace("{{PDF_LINK}}", pdfLink)
      .replace("{{UnsubscribeUrl}}", unsubscribeUrl);

    // Send email(s)
    const emailsToSend = Array.isArray(email) ? email : [email];

    await Promise.all(
      emailsToSend.map(async (e) => {
        if (!e || e.trim() === "") return; // skip empty emails
        try {
          await sendEmail({
            to: e,
            subject,
            html,
            attachments: attachments
          });
        } catch (err) {
          console.error(`Failed to send email to ${e}:`, err);
        }
      })
    );

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
    } else if (error.message === "EMAIL_TEMPLATE_NOT_FOUND") {
      return NextResponse.json(
        { success: false, message: "Email template not found" },
        { status: 500 }
      );
    }

    console.error("POST /api/send-email error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
