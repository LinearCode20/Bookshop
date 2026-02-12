import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";
//import { sendEmail } from "@/lib/resend";
import fs from "fs";
import path from "path";
import { saveTransactionWithCheck } from "@/lib/subscribedEmails";

export async function POST(req: Request) {
  try {

    const { email, subject, emailType } = await req.json();

    let pdfLink = "";
    let templatePath = "";
    let UnsubscribeUrl = "";

    if (emailType === "First-Chapter") {
      pdfLink = `${process.env.BASE_URL}/pdfs/chapter-one.pdf`;

      // Save only for First-Chapter
      const subscribeId =  await saveTransactionWithCheck({
        email,
        subscribe_status: true,
        created_at: new Date().toISOString(),
      });

      UnsubscribeUrl = `${process.env.BASE_URL}/?status=Unsubscribe&tx=${subscribeId}`;
      
      templatePath = path.join(
        process.cwd(),
        "emails/free-chapter-one.html"
      );
    } else if (emailType === "Purchase-Confirmed") {
      // This email will go when payment is confirmed

      templatePath = path.join(
        process.cwd(),
        "emails/purchase-confirmation.html"
      );
      pdfLink = `${process.env.BASE_URL}`;

    }
    else if (emailType === "Payment-failed") {
      // This email will go when payment is canceled

      templatePath = path.join(
        process.cwd(),
        "emails/payment-faild.html"
      );
      pdfLink = `${process.env.BASE_URL}`;
    }
    else if (emailType === "refund-success") {
      // This email will go when refund payment

      templatePath = path.join(
        process.cwd(),
        "emails/refund-processed.html"
      );
      pdfLink = `${process.env.BASE_URL}`;
    }
    else if (emailType === "refund-faild") {
      // This email will go when refund payment faild

      templatePath = path.join(
        process.cwd(),
        "emails/refund-declined.html"
      );
      pdfLink = `${process.env.BASE_URL}`;
    }

    else { // This is used for sending full book email Access-Delivery
      const parts = emailType.split("*");
      const transactionIdValue = parts[1] ?? "";

      templatePath = path.join(
        process.cwd(),
        "emails/access-delivery.html"
      );
      pdfLink = `${process.env.BASE_URL}?token=${transactionIdValue}`;
    }

    // Ensure templatePath is set
    if (!templatePath) {
      throw new Error("EMAIL_TEMPLATE_NOT_FOUND");
    }

    const html = fs
      .readFileSync(templatePath, "utf8")
      .replace("{{PDF_LINK}}", pdfLink)
      .replace("{{UnsubscribeUrl}}", UnsubscribeUrl);

    //Send email with Resend
    await sendEmail({
      to: email,
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
    }

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
