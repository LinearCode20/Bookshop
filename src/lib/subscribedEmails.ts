import { supabase } from "@/lib/supabase/server";

interface SaveSubscriberedEmails {
  email: string;
  subscribe_status: boolean;
  created_at: string;
}

export async function saveTransactionWithCheck(
  data: SaveSubscriberedEmails
) {
  const { email, subscribe_status, created_at } = data;

  const { data: inserted, error } = await supabase
    .from("subscribe_emails")
    .insert([
      {
        email,
        subscribe_status,
        created_at,
      },
    ])
    .select("id")
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }
    throw new Error(`Supabase insert failed: ${error.message}`);
  }

  return inserted.id;   // 👈 return inserted record id
}

export async function getAllSubscribedEmails(): Promise<string[]> {
  const { data, error } = await supabase
    .from("subscribe_emails")
    .select("email")
    .eq("subscribe_status", true);

  if (error) {
    throw new Error(`Supabase fetch failed: ${error.message}`);
  }

  if (!data || data.length === 0) {
    return []; // no subscribed emails
  }

  // Map to array of email strings
  return data.map((row: { email: string }) => row.email);
}
