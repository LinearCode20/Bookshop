import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/server";
import path from "path";
import { sendEmail } from "@/lib/mailer";
import fs from "fs";

export async function GET() {
  try {
    const tenDaysAgo = new Date(
      Date.now() - 10 * 24 * 60 * 60 * 1000
    ).toISOString();

    // update-first pattern
    const { data: users, error } = await supabase
      .from("transactions")
      .update({
        followup_status: false,
        followup_sent_at: new Date().toISOString(),
      })
      .eq("followup_status", true)
      .lte("created_at", tenDaysAgo)
      .select();

    if (error) throw error;

    if (!users || users.length === 0) {
      return NextResponse.json({ success: true, message: "No users found" });
    }

    const templatePath = path.join(
      process.cwd(),
      "emails/buyer-follow-up.html"
    );

    const html = fs.readFileSync(templatePath, "utf8");

    await Promise.all(
      users.map(user =>
        sendEmail({
          to: user.email,
          subject: "Just checking in.",
          html,
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
