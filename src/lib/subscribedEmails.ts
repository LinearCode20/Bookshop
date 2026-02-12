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
