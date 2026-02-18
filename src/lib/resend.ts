import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailProps {
  to: string;
  subject: string;
  html: string;
  attachments?: {
    filename: string;
    content: Buffer;
  }[];
}

export async function sendEmail({
  to,
  subject,
  html,
  attachments = [],
}: SendEmailProps) {
  try {
    const response = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!, // must be verified
      to,
      subject,
      html,
      attachments,
    });

    return response;
  } catch (err) {
    console.error("Resend email error:", err);
    throw err;
  }
}
