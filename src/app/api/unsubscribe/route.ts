import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tx = searchParams.get("tx");

  if (!tx) {
    return NextResponse.json({ status: "invalid" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("subscribe_emails")
    .select("subscribe_status")
    .eq("id", tx)
    .single();

  if (error || !data) {
    return NextResponse.json({ status: "invalid" }, { status: 400 });
  }

  if (data.subscribe_status === false) {
    return NextResponse.json({ status: "already_unsubscribed" });
  }

  await supabase
    .from("subscribe_emails")
    .update({ subscribe_status: false })
    .eq("id", tx);

  return NextResponse.json({ status: "unsubscribed" });
}
