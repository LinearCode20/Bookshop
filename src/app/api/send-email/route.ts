import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { email, subject, type } = await req.json();
    let pdfLink = '';
    let templatePath = '';
    if (type === 'FirstFirst-Chapter') {
      pdfLink = `${process.env.BASE_URL}/pdfs/chapter-one.pdf`;

      templatePath = path.join(
        process.cwd(),
        "emails/free-ebook.html"
      );

    } else {
      const parts = type.split("*");
      //const productType = parts[0] ?? "";
      const transactionIdValue = parts[1] ?? "";
      templatePath = path.join(
        process.cwd(),
        "emails/full-ebook.html"
      );
      pdfLink = `${process.env.BASE_URL}?token=${transactionIdValue}`      
    }
    //const pdfLink = `${process.env.BASE_URL}/pdfs/chapter-one.pdf`;

    //   const html = `
    //    <div
    //     style={{
    //       backgroundColor: "#000",
    //       color: "#eee",
    //       fontFamily: '"Arial", sans-serif',
    //       padding: "40px 20px",
    //       textAlign: "center",
    //       lineHeight: 1.6,
    //     }}
    //   >
    //     <p style={{ color: "#666", fontSize: 12, marginBottom: 10 }}>
    //       COMPOSURE WHEN IT MATTERS
    //     </p>

    //     <p style={{ color: "#888", fontSize: 12, marginBottom: 20 }}>
    //       A MANUAL FOR MEN
    //     </p>

    //     <h1 style={{ fontWeight: "bold", fontSize: 24, marginBottom: 20 }}>
    //       LET ME GIVE YOU THE GAME
    //     </h1>

    //     <p style={{ color: "#888", marginBottom: 20 }}>
    //       Men don’t lack information. They lack instruction.
    //     </p>

    //     <p style={{ color: "#888", marginBottom: 20 }}>
    //       Written with British restraint.
    //     </p>

    //     <p style={{ color: "#888", marginBottom: 20 }}>
    //       For men who prefer order over commotion. Belief is not required.
    //     </p>

    //     <p style={{ color: "#888", marginBottom: 30 }}>
    //       Start here. Decide for yourself.
    //     </p>

    //     <a
    //       href=${pdfLink}
    //       style={{
    //         backgroundColor: "#eee",
    //         color: "#000",
    //         padding: "10px 20px",
    //         textDecoration: "none",
    //         fontWeight: "bold",
    //         borderRadius: 2,
    //         display: "inline-block",
    //         letterSpacing: 1,
    //         fontSize: 14,
    //       }}
    //     >
    //       [ READ CHAPTER ONE ]
    //     </a>
    //   </div>
    // `;

    let html = fs.readFileSync(templatePath, "utf8");
    html = html.replace("{{PDF_LINK}}", pdfLink);

    await sendEmail({
      to: email,
      subject: subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
