import { supabase } from "@/lib/supabase/server";

type TransactionInput = {
  transaction_id: string;
  stripe_transaction_id: string;
  status: "pending" | "paid" | "failed" | "canceled";
  download_expiry: string;
  created_at: string;
};

export async function saveTransaction(data: TransactionInput) {
  const { error } = await supabase
    .from("transactions")
    .insert([data]);

  if (error) {
    console.error("Supabase insert error:", error);
    throw new Error("Failed to save transaction");
  }
}

export async function updateTransactionStatus(
  transactionId: string,
  status: string
) {
  const { error, data } = await supabase
    .from("transactions")
    .update({ status })
    .eq("transaction_id", transactionId)
    .select();

  if (error) {
    console.error("Supabase update error:", error);
    throw new Error("Failed to update transaction status");
  }

  return data;
}
